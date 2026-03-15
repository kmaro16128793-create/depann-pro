const http = require('http');
const fs = require('fs');
const path = require('path');
const zlib = require('zlib');

const PORT = 3010;
const ROOT = __dirname;

const mime = {
  '.html': 'text/html', '.css': 'text/css', '.js': 'application/javascript',
  '.woff2': 'font/woff2', '.woff': 'font/woff', '.ttf': 'font/ttf',
  '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png',
  '.webp': 'image/webp', '.svg': 'image/svg+xml', '.ico': 'image/x-icon',
  '.json': 'application/json'
};

http.createServer((req, res) => {
  let filePath = path.join(ROOT, req.url === '/' ? '/index.html' : req.url);
  filePath = filePath.split('?')[0];
  const ext = path.extname(filePath).toLowerCase();
  const type = mime[ext] || 'application/octet-stream';

  fs.readFile(filePath, (err, data) => {
    if (err) { res.writeHead(404); res.end('Not found'); return; }

    const headers = {
      'Content-Type': type,
      'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000',
      'Vary': 'Accept-Encoding'
    };

    const ae = req.headers['accept-encoding'] || '';
    const compressable = ['.html','.css','.js','.svg'].includes(ext);

    if (compressable && ae.includes('br')) {
      zlib.brotliCompress(data, (e, buf) => {
        res.writeHead(200, { ...headers, 'Content-Encoding': 'br' });
        res.end(buf);
      });
    } else if (compressable && ae.includes('gzip')) {
      zlib.gzip(data, (e, buf) => {
        res.writeHead(200, { ...headers, 'Content-Encoding': 'gzip' });
        res.end(buf);
      });
    } else {
      res.writeHead(200, headers);
      res.end(data);
    }
  });
}).listen(PORT, () => console.log(`depann-pro → http://localhost:${PORT}`));
