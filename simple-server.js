const http = require("http");
const fs = require("fs");
const path = require("path");

const PORT = 3014;

const server = http.createServer((req, res) => {
  console.log(`Request: ${req.method} ${req.url}`);
  
  const filePath = path.join(__dirname, "out", "index.html");
  
  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(404);
      res.end("File not found");
      return;
    }
    
    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(content);
  });
});

server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
  console.log(`Builder page: http://localhost:${PORT}/builder`);
});
