const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Endpoint
app.post('/check-code', (req, res) => {
  const { code } = req.body;

  if (code === 'test') {
    res.json({ message: 'Poprawny kod' });
  } else {
    res.json({ message: 'Niepoprawny kod' });
  }
});

// Uruchomienie serwera
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Serwer działa na http://localhost:${PORT}`);
});
