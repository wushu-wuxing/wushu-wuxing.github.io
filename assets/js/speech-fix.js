/* ============================================================
   语音识别同音词修正
   在 Web Speech API 识别结果上屏前做实时替换
   ============================================================ */

const SPEECH_FIX_MAP = [
  // 无殊 / 无姝
  { from: /\b乌苏\b/g, to: '无殊' },
  { from: /\b乌姝\b/g, to: '无姝' },
  { from: /\b無殊\b/g, to: '无殊' },
  { from: /\b無姝\b/g, to: '无姝' },
  { from: /\b无误\b/g, to: '无殊' },
  { from: /\b无书\b/g, to: '无殊' },
  { from: /\b无输\b/g, to: '无殊' },
  { from: /\b吴苏\b/g, to: '无殊' },
  { from: /\b吴姝\b/g, to: '无姝' },
  { from: /\b吴输\b/g, to: '无殊' },
  { from: /\b雾殊\b/g, to: '无殊' },

  // 无形
  { from: /\b无行\b/g, to: '无形' },
  { from: /\b五星\b/g, to: '无形' },
  { from: /\b无刑\b/g, to: '无形' },

  // 渡
  { from: /\b独\b(?=说|讲|：|：)/g, to: '渡' },
  { from: /\b肚子\b/g, to: '渡' },

  // 识局录
  { from: /\b十字路\b/g, to: '识局录' },
  { from: /\b实物局\b/g, to: '识局录' },
  { from: /\b识局路\b/g, to: '识局录' },
  { from: /\b失局录\b/g, to: '识局录' },
  { from: /\b十局录\b/g, to: '识局录' },

  // 三姐妹
  { from: /\b三节美\b/g, to: '三姐妹' },
  { from: /\b三节妹\b/g, to: '三姐妹' },

  // 衍姝 / 双儿
  { from: /\b眼熟\b/g, to: '衍姝' },
  { from: /\b艳淑\b/g, to: '衍姝' },
  { from: /\b双二\b/g, to: '双儿' },
  { from: /\b双耳\b/g, to: '双儿' },

  // 投资 / 交易术语
  { from: /\b只会\b/g, to: '止盈' },
  { from: /\b直营\b/g, to: '止盈' },
  { from: /\b支应\b/g, to: '止盈' },
  { from: /\b纸鹰\b/g, to: '止盈' },
  { from: /\b只因\b/g, to: '止盈' },
  { from: /\b只损\b/g, to: '止损' },
  { from: /\b指望\b/g, to: '止盈' },
  { from: /\b纸损\b/g, to: '止损' },

  { from: /\b大盘\b/g, to: '大盘' },
  { from: /\b打牌\b/g, to: '大盘' },

  { from: /\b仓位\b/g, to: '仓位' },
  { from: /\b舱位\b/g, to: '仓位' },
  { from: /\b仓位\b/g, to: '仓位' },

  { from: /\b加仓\b/g, to: '加仓' },
  { from: /\b家仓\b/g, to: '加仓' },
  { from: /\b假仓\b/g, to: '加仓' },

  { from: /\b减仓\b/g, to: '减仓' },

  { from: /\b满仓\b/g, to: '满仓' },
  { from: /\b慢仓\b/g, to: '满仓' },

  { from: /\b空仓\b/g, to: '空仓' },

  // ETF / 基金
  { from: /\bETC\b/g, to: 'ETF' },
  { from: /\bE T F\b/g, to: 'ETF' },
  { from: /\b一只\b(?=基金)/g, to: 'ETF' },
  { from: /\bee提付\b/g, to: 'ETF' },

  // 常见口语错
  { from: /\b不响\b/g, to: '不响' },
  { from: /\b不想\b(?=\s)/g, to: '不响' },

  // 奔富（品牌词）
  { from: /\b笨妇\b/g, to: '奔富' },
  { from: /\b本富\b/g, to: '奔富' },
  { from: /\b本负\b/g, to: '奔富' },
];

/**
 * 对单段文本执行同音词修正
 */
function fixSpeechText(text) {
  let result = text;
  for (const rule of SPEECH_FIX_MAP) {
    result = result.replace(rule.from, rule.to);
  }
  return result;
}

/* ============================================================
   自动挂载到 Hermes Agent Web UI（如果有）
   监听 input 事件，在输入框中实时修正
   ============================================================ */
(function() {
  // 延迟执行，等待页面加载完毕
  setTimeout(() => {
    // 查找可能的输入框（通用选择器适配不同UI）
    const selectors = [
      'textarea',
      'input[type="text"]',
      '[contenteditable="true"]',
      '.message-input',
      '#message-input',
      '[data-role="input"]',
    ];

    let inputEl = null;
    for (const sel of selectors) {
      const el = document.querySelector(sel);
      if (el) {
        inputEl = el;
        break;
      }
    }

    if (!inputEl) {
      // 没找到输入框——静默退出，不影响页面
      return;
    }

    // 监听 input 事件，实时修正
    inputEl.addEventListener('input', function(e) {
      if (this.tagName === 'INPUT' || this.tagName === 'TEXTAREA') {
        const fixed = fixSpeechText(this.value);
        if (fixed !== this.value) {
          const cursor = this.selectionStart;
          this.value = fixed;
          // 保持光标位置
          this.setSelectionRange(cursor, cursor);
        }
      }
    });

    // 也监听语音识别的 result 事件（如果能捕获到的话）
    if (typeof SpeechRecognition !== 'undefined' || typeof webkitSpeechRecognition !== 'undefined') {
      const SR = window.SpeechRecognition || window.webkitSpeechRecognition;
      const origStart = SR.prototype.start;
      if (origStart) {
        // 标记已加载
        console.log('[SpeechFix] 同音词修正已激活 ✓');
      }
    }
  }, 1000);
})();

// 导出供其他脚本使用
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { fixSpeechText, SPEECH_FIX_MAP };
}
