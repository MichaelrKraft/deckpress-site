const http = require('http');
const fs = require('fs');
const path = require('path');

const PORT = 7777;
const STATIC_DIR = path.join(__dirname, 'out');

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.gif': 'image/gif',
  '.ico': 'image/x-icon',
  '.svg': 'image/svg+xml',
  '.woff2': 'font/woff2',
  '.woff': 'font/woff',
  '.ttf': 'font/ttf'
};

const server = http.createServer((req, res) => {
  // Add CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  console.log(`${req.method} ${req.url}`);

  let filePath = path.join(STATIC_DIR, req.url === '/' ? 'index.html' : req.url);
  
  // Handle SPA routing - if file doesn't exist and no extension, try .html
  if (!path.extname(filePath) && req.url !== '/') {
    filePath += '.html';
  }

  const extname = path.extname(filePath);
  const contentType = mimeTypes[extname] || 'application/octet-stream';

  fs.readFile(filePath, (error, content) => {
    if (error) {
      if (error.code === 'ENOENT') {
        // File not found - try index.html for SPA routing
        fs.readFile(path.join(STATIC_DIR, 'index.html'), (indexError, indexContent) => {
          if (indexError) {
            res.writeHead(404, { 'Content-Type': 'text/plain' });
            res.end('404 Not Found');
          } else {
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.end(indexContent, 'utf-8');
          }
        });
      } else {
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('500 Internal Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`
🎉 DeckPress Server Running!

📍 Access your application at:
   http://localhost:${PORT}

📄 Available pages:
   • Homepage: http://localhost:${PORT}
   • Builder: http://localhost:${PORT}/builder/
   • Gamma Builder: http://localhost:${PORT}/gamma-builder/
   
✅ Server is ready for connections on port ${PORT}
`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.log(`Port ${PORT} is busy, trying ${PORT + 1}...`);
    setTimeout(() => {
      server.close();
      server.listen(PORT + 1);
    }, 1000);
  }
});