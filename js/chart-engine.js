/**
 * 无形识局 · 图表引擎 v2.0
 * ECharts 分时 + K线（基于可用的Tencent行情API）
 * 数据源：qt.gtimg.cn（腾讯行情，国内直连可用）
 */
(function(global) {
  'use strict';

  // ---- 指标计算 ----
  const Calc = {
    MA(data, period) {
      const r = [];
      for (let i = 0; i < data.length; i++) {
        if (i < period - 1) { r.push(null); continue; }
        let sum = 0;
        for (let j = i - period + 1; j <= i; j++) sum += data[j][1]; // close
        r.push(sum / period);
      }
      return r;
    },
    EMA(data, period) {
      const k = 2 / (period + 1);
      const r = []; let ema = data[0][1];
      for (let i = 0; i < data.length; i++) {
        if (i === 0) { r.push(ema); continue; }
        ema = data[i][1] * k + ema * (1 - k);
        r.push(ema);
      }
      return r;
    },
    MACD(data) {
      const ema12 = Calc.EMA(data, 12);
      const ema26 = Calc.EMA(data, 26);
      const dif = ema12.map((v, i) => v - ema26[i]);
      const deaK = 2 / 10; let deaVal = dif[0];
      const dea = dif.map((v, i) => { if (i===0) return deaVal; deaVal = v * deaK + deaVal * (1-deaK); return deaVal; });
      const macd = dif.map((v, i) => 2 * (v - dea[i]));
      return { dif, dea, macd };
    },
    KDJ(data, n=9) {
      const kArr=[], dArr=[], jArr=[];
      for (let i=0; i<data.length; i++) {
        if (i < n-1) { kArr.push(50); dArr.push(50); jArr.push(50); continue; }
        let hhv=-Infinity, llv=Infinity;
        for (let j=i-n+1; j<=i; j++) { if (data[j][2] > hhv) hhv=data[j][2]; if (data[j][3] < llv) llv=data[j][3]; }
        const rsv = hhv===llv ? 50 : (data[i][1]-llv)/(hhv-llv)*100;
        const k = i===0 ? 50 : (2/3)*kArr[i-1] + (1/3)*rsv;
        kArr.push(k); const d = i===0 ? 50 : (2/3)*dArr[i-1] + (1/3)*k;
        dArr.push(d); jArr.push(3*k - 2*d);
      }
      return { k: kArr, d: dArr, j: jArr };
    },
    RSI(data, period) {
      const r=[]; let gain=0, loss=0;
      for (let i=1; i<data.length; i++) {
        const diff = data[i][1] - data[i-1][1];
        gain += diff>0 ? diff : 0; loss += diff<0 ? -diff : 0;
        if (i < period) { r.push(null); continue; }
        if (i >= period) { gain *= (period-1)/period; loss *= (period-1)/period; }
        r.push(loss===0 ? 100 : 100 - 100/(1+gain/loss));
      }
      while (r.length < data.length) r.unshift(null);
      return r;
    },
  };

  // ---- Data persistence (localStorage K-line cache) ----
  const KCache = {
    _prefix: 'chart_kline_',

    get(code) {
      try { return JSON.parse(localStorage.getItem(this._prefix + code) || '[]'); } catch(e) { return []; }
    },
    set(code, data) {
      localStorage.setItem(this._prefix + code, JSON.stringify(data));
    },
    // Add/sync daily record from real-time quote
    syncFromQuote(code, q) {
      if (!q || !q.price) return;
      const records = this.get(code);
      const today = new Date().toISOString().slice(0, 10);
      const existing = records.find(r => r[0] === today);
      if (existing) {
        // Update: keep open, update high/low/close
        existing[2] = Math.max(existing[2], q.price); // high
        existing[3] = Math.min(existing[3], q.price); // low
        existing[1] = q.price; // close (latest)
        existing[4] = q.vol || existing[4]; // vol
      } else {
        // New record: date, open, close, high, low, vol
        records.push([today, q.open || q.price, q.price, q.high || q.price, q.low || q.price, q.vol || 0]);
      }
      // Keep last 365 days
      const sorted = records.sort((a, b) => a[0].localeCompare(b[0])).slice(-365);
      this.set(code, sorted);
      return sorted;
    },
  };

  // ---- Fetch real-time quote via Tencent API ----
  // Multi-proxy fallback (same pattern as sandbox DATA_ENGINE)
  const PROXIES = [
    'http://127.0.0.1:8082/api/proxy?url=',
    'https://api.allorigins.win/raw?url=',
    'https://corsproxy.io/?url=',
    '',
  ];

  async function _fetchQuote(code) {
    const url = 'https://qt.gtimg.cn/q=' + code;
    for (let pi = PROXIES.length - 1; pi >= 0; pi--) {
      const proxy = PROXIES[pi];
      const full = proxy ? proxy + encodeURIComponent(url) : url;
      for (let a = 0; a <= 1; a++) {
        try {
          const resp = await fetch(full, { signal: AbortSignal.timeout(5000) });
          if (resp.ok) {
            const buf = await resp.arrayBuffer();
            let text;
            try { text = new TextDecoder('gbk').decode(buf); } catch(e) { text = new TextDecoder('utf-8').decode(buf); }
            const m = text.match(/v_(\w+)="([^"]+)"/);
            if (!m) return null;
            const parts = m[2].split('~');
            if (parts.length < 5) return null;
            return {
              name: parts[1], price: parseFloat(parts[3]), prevClose: parseFloat(parts[4]),
              open: parseFloat(parts[5]), vol: parseFloat(parts[6]), high: parseFloat(parts[9]),
              low: parseFloat(parts[10]),
            };
          }
        } catch(e) { if (a === 0) await new Promise(r=>setTimeout(r,800)); }
      }
    }
    return null;
  }

  // ---- K-line data builder ----
  // Build K-line from cached daily records and real-time quote
  async function _buildKlineData(code) {
    const q = await _fetchQuote(code);
    if (!q) return { klineData: [], quote: null };
    // Sync cache with latest quote
    const kc = KCache.syncFromQuote(code, q);

    // Format for ECharts: [date, open, close, low, high]
    const klineData = kc.map(r => [r[0], r[1], r[2], r[3], r[4]]);

    // If cached is sparse, use quote as single point
    if (klineData.length === 0 && q.price) {
      const today = new Date().toISOString().slice(0, 10);
      klineData.push([today, q.price, q.price, q.price, q.vol || 0]);
    }

    return { klineData, quote: q };
  }

  // ---- ChartEngine ----
  const ChartEngine = {
    _chart: null,
    _code: '',
    _indicator: 'macd',
    _klineData: [], // ECharts format [date, open, close, low, high]
    _quote: null,

    async init(containerId, code, name) {
      this._code = code;
      this._destroy();

      const container = document.getElementById(containerId);
      if (!container) return;

      container.innerHTML = '<div class="text-muted" style="text-align:center;padding:60px 20px;">⏳ 加载行情数据...</div>';

      // Load ECharts if needed
      if (typeof echarts === 'undefined') {
        try {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/npm/echarts@5.6.0/dist/echarts.min.js';
          document.head.appendChild(s);
          await new Promise((resolve, reject) => {
            s.onload = resolve;
            s.onerror = () => reject(new Error('echarts load failed'));
          });
        } catch(e) {
          container.innerHTML = '<div class="text-muted" style="text-align:center;padding:60px 20px;">❌ 图表库加载失败，请刷新重试</div>';
          return;
        }
      }

      // Build K-line from cached + real-time data
      const { klineData, quote } = await _buildKlineData(code);
      this._klineData = klineData;
      this._quote = quote;

      if (klineData.length === 0) {
        container.innerHTML = '<div class="text-muted" style="text-align:center;padding:60px 20px;">📊 暂无足够数据，请明日再查看K线图<br><span class="fs-12">系统每天自动积累一只K线数据</span></div>';
        return;
      }

      this._chart = echarts.init(container, null, { renderer: 'canvas' });
      window.addEventListener('resize', () => { if (this._chart) this._chart.resize(); });
      this._render();
    },

    _render() {
      if (!this._chart || this._klineData.length === 0) return;

      const data = this._klineData;
      const dates = data.map(d => d[0].slice(5));
      const ohlc = data.map(d => [d[1], d[2], d[4], d[3]]);
      const vols = data.map(d => d[4] || 0);
      const closes = data.map(d => d[2]);

      // Moving averages
      const ma5 = Calc.MA(data, 5);
      const ma10 = Calc.MA(data, 10);
      const ma20 = Calc.MA(data, 20);

      // Indicators
      const macdData = Calc.MACD(data);
      const kdjData = Calc.KDJ(data);
      const rsi6 = Calc.RSI(data, 6);
      const rsi12 = Calc.RSI(data, 12);
      const rsi24 = Calc.RSI(data, 24);

      const upColor = '#ef4444', downColor = '#22c55e';

      // Indicator sub-series
      let indSeries = [];
      if (this._indicator === 'macd') {
        indSeries = [
          { name: 'DIF', type: 'line', data: macdData.dif, smooth: true, lineStyle: { width: 1, color: '#4a9eff' }, symbol: 'none' },
          { name: 'DEA', type: 'line', data: macdData.dea, smooth: true, lineStyle: { width: 1, color: '#f59e0b' }, symbol: 'none' },
          { name: 'MACD', type: 'bar', data: macdData.macd, itemStyle: { color: (p) => p.value >= 0 ? upColor : downColor } },
        ];
      } else if (this._indicator === 'kdj') {
        indSeries = [
          { name: 'K', type: 'line', data: kdjData.k, smooth: true, lineStyle: { width: 1, color: '#4a9eff' }, symbol: 'none' },
          { name: 'D', type: 'line', data: kdjData.d, smooth: true, lineStyle: { width: 1, color: '#f59e0b' }, symbol: 'none' },
          { name: 'J', type: 'line', data: kdjData.j, smooth: true, lineStyle: { width: 1, color: '#a855f7' }, symbol: 'none' },
        ];
      } else if (this._indicator === 'rsi') {
        indSeries = [
          { name: 'RSI6', type: 'line', data: rsi6, smooth: true, lineStyle: { width: 1, color: '#4a9eff' }, symbol: 'none' },
          { name: 'RSI12', type: 'line', data: rsi12, smooth: true, lineStyle: { width: 1, color: '#f59e0b' }, symbol: 'none' },
          { name: 'RSI24', type: 'line', data: rsi24, smooth: true, lineStyle: { width: 1, color: '#a855f7' }, symbol: 'none' },
        ];
      }

      const allSeries = [
        { name: 'K线', type: 'candlestick', xAxisIndex: 0, yAxisIndex: 0,
          data: ohlc, itemStyle: { color: upColor, color0: downColor, borderColor: upColor, borderColor0: downColor } },
        { name: 'MA5', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: ma5, smooth: true,
          lineStyle: { width: 1, color: '#f59e0b' }, symbol: 'none' },
        { name: 'MA10', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: ma10, smooth: true,
          lineStyle: { width: 1, color: '#a855f7' }, symbol: 'none' },
        { name: 'MA20', type: 'line', xAxisIndex: 0, yAxisIndex: 0, data: ma20, smooth: true,
          lineStyle: { width: 1, color: '#06b6d4' }, symbol: 'none' },
        { name: '成交量', type: 'bar', xAxisIndex: 1, yAxisIndex: 1, data: vols,
          itemStyle: { color: (p) => p.dataIndex > 0 && closes[p.dataIndex] < closes[p.dataIndex-1] ? downColor : upColor } },
      ];

      // Quote info
      const q = this._quote;
      const qInfo = q ? `${q.name} · 现价 ${q.price.toFixed(2)} · 昨收 ${q.prevClose.toFixed(2)}` : '';

      const option = {
        backgroundColor: 'transparent',
        title: { text: qInfo, textStyle: { color: '#e8e2d4', fontSize: 13, fontWeight: 'normal' }, top: 2, left: 'center' },
        tooltip: {
          trigger: 'axis', axisPointer: { type: 'cross' },
          backgroundColor: 'rgba(12,12,29,0.9)', borderColor: '#2a2a4a', borderWidth: 1,
          textStyle: { color: '#e8e2d4', fontSize: 12 },
          formatter: function(params) {
            const idx = params[0].dataIndex;
            const d = data[idx];
            if (!d) return '';
            const chg = idx > 0 ? ((d[2] / data[idx-1][2] - 1) * 100).toFixed(2) : '0.00';
            const chgCls = chg >= 0 ? '↑' : '↓';
            return `<b>${d[0]}</b><br/>开: ${d[1].toFixed(2)} 收: ${d[2].toFixed(2)} 高: ${d[3].toFixed(2)} 低: ${d[4].toFixed(2)}<br/>涨幅: <span style="color:${chg >= 0 ? '#ef4444' : '#22c55e'}">${chgCls}${Math.abs(chg)}%</span>`;
          },
        },
        legend: {
          data: ['K线','MA5','MA10','MA20',...indSeries.map(s => s.name)],
          textStyle: { color: '#9999bb', fontSize: 10 },
          top: 20, left: 'center',
        },
        grid: [
          { left: '6%', right: '3%', top: '16%', height: '46%' },
          { left: '6%', right: '3%', top: '64%', height: '10%' },
          { left: '6%', right: '3%', top: '76%', height: '18%' },
        ],
        xAxis: [
          { type: 'category', data: dates, gridIndex: 0, axisLabel: { color: '#9999bb', fontSize: 9 }, axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, splitLine: { show: false } },
          { type: 'category', data: dates, gridIndex: 1, axisLabel: { show: false }, splitLine: { show: false } },
          { type: 'category', data: dates, gridIndex: 2, axisLabel: { color: '#9999bb', fontSize: 9 }, axisLine: { lineStyle: { color: 'rgba(255,255,255,0.1)' } }, splitLine: { show: false } },
        ],
        yAxis: [
          { scale: true, gridIndex: 0, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#9999bb', fontSize: 10 } },
          { scale: false, gridIndex: 1, splitNumber: 2, splitLine: { show: false }, axisLabel: { show: false }, min: 0 },
          { scale: true, gridIndex: 2, splitLine: { lineStyle: { color: 'rgba(255,255,255,0.05)' } }, axisLabel: { color: '#9999bb', fontSize: 10 } },
        ],
        dataZoom: [
          { type: 'inside', xAxisIndex: [0,1,2], start: Math.max(0, 100-60), end: 100 },
          { type: 'slider', xAxisIndex: [0,1,2], start: Math.max(0, 100-60), end: 100, height: 10, bottom: 0,
            borderColor: '#2a2a4a', backgroundColor: 'rgba(12,12,29,0.8)', fillerColor: 'rgba(184,149,106,0.15)',
            textStyle: { color: '#9999bb', fontSize: 9 } },
        ],
        series: [
          ...allSeries,
          ...indSeries.map(s => ({ ...s, xAxisIndex: 2, yAxisIndex: 2 })),
        ],
        animation: false,
      };

      this._chart.setOption(option, true);
    },

    async switchTimeframe(kl) {
      // For Tencent API, we only have daily data cached
      // In future, could add intraday polling for 分时图
      // Aggregation: week = last 5 days, month = last 22 days
      // For non-daily timeframes, keep existing data but limit for readability
      if (this._code) {
        const { klineData, quote } = await _buildKlineData(this._code);
        this._klineData = klineData;
        this._quote = quote;
        this._render();
      }
    },

    switchIndicator(indicator) {
      this._indicator = indicator;
      this._render();
    },

    resize() {
      if (this._chart) this._chart.resize();
    },

    _destroy() {
      if (this._chart) { this._chart.dispose(); this._chart = null; }
      this._klineData = [];
      this._quote = null;
    },
    destroy() { this._destroy(); },
  };

  global.ChartEngine = ChartEngine;
})(window);
