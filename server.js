/**
 * 无形识局 · API代理服务器
 * 解决CORS问题：浏览器 → 本服务器 → 外部API（qt.gtimg.cn）
 * 替代方案：Python3 http.server或Node.js
 */
const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const PORT = 8082;
const ROOT = __dirname;

const MIME = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
};

function serveStatic(res, filePath) {
  const ext = path.extname(filePath);
  const mime = MIME[ext] || 'application/octet-stream';
  fs.readFile(filePath, (err, data) => {
    if (err) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      res.end('404 Not Found: ' + filePath);
      return;
    }
    res.writeHead(200, { 'Content-Type': mime, 'Access-Control-Allow-Origin': '*' });
    res.end(data);
  });
}

async function proxyRequest(targetUrl, res) {
  try {
    const u = new url.URL(targetUrl);
    const options = {
      hostname: u.hostname,
      port: u.port || 80,
      path: u.pathname + u.search,
      method: 'GET',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
        'Referer': 'https://gu.qq.com/',
        'Accept': '*/*',
      },
      timeout: 8000,
    };

    const proxyReq = http.request(options, (proxyRes) => {
      const chunks = [];
      proxyRes.on('data', c => chunks.push(c));
      proxyRes.on('end', () => {
        const buf = Buffer.concat(chunks);
        // Inherit content-type from original, allow all origins
        const origCT = proxyRes.headers['content-type'] || 'application/octet-stream';
        res.writeHead(proxyRes.statusCode || 200, {
          'Content-Type': origCT,
          'Access-Control-Allow-Origin': '*',
          'Access-Control-Allow-Methods': 'GET, OPTIONS',
          'Access-Control-Allow-Headers': '*',
        });
        res.end(buf);
      });
    });
    proxyReq.on('error', (e) => {
      res.writeHead(502, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end('Proxy error: ' + e.message);
    });
    proxyReq.on('timeout', () => { proxyReq.destroy(); });
    proxyReq.end();
  } catch(e) {
    res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
    res.end('Bad request: ' + e.message);
  }
}

const server = http.createServer((req, res) => {
  const parsed = url.parse(req.url, true);
  const pathname = parsed.pathname;

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204, {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    });
    res.end();
    return;
  }

  // API proxy endpoint
  if (pathname === '/api/proxy') {
    const targetUrl = parsed.query.url;
    if (!targetUrl) {
      res.writeHead(400, { 'Content-Type': 'text/plain; charset=utf-8', 'Access-Control-Allow-Origin': '*' });
      res.end('Missing "url" query param');
      return;
    }
    proxyRequest(targetUrl, res);
    return;
  }

  // Serve static files (sandbox.html, js/*, etc.)
  let filePath = path.join(ROOT, pathname === '/' ? '/sandbox.html' : pathname);
  serveStatic(res, filePath);
});

server.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 无姝API代理服务器 → http://127.0.0.1:${PORT}/`);
  console.log(`   Proxy: http://127.0.0.1:${PORT}/api/proxy?url=https://qt.gtimg.cn/q=sz002371`);
});
