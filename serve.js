const express = require('express');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3333;

// Serve static files from 'out' directory
app.use(express.static(path.join(__dirname, 'out')));

// Handle client-side routing
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'out', 'index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`
🚀 DeckPress is running!
📱 Local: http://localhost:${PORT}
🌐 Network: http://0.0.0.0:${PORT}
  `);
});