const express = require('express');
const request = require('request');
const cors = require('cors'); // Para permitir requisições CORS

const app = express();

// Habilitar CORS para permitir requisições do frontend
app.use(cors());

app.get('/proxy', (req, res) => {
  const url = req.query.url;
  if (!url) {
    return res.status(400).send('No URL provided.');
  }

  // Redirecionar a requisição para o servidor de origem
  request(url).pipe(res);
});

const PORT = 3001;
app.listen(PORT, () => {
  console.log(`Proxy server running on port ${PORT}`);
});