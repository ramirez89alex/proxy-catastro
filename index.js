const express = require('express');
const fetch = require('node-fetch');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());

app.get('/proxy-catastro', async (req, res) => {
    const url = req.query.url;
    if (!url) return res.status(400).send('URL requerida');

    try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Error al obtener el recurso');
        const contentType = response.headers.get('content-type');
        res.setHeader('Content-Type', contentType);
        const buffer = await response.buffer();
        res.send(buffer);
    } catch (error) {
        res.status(500).send('Error al obtener el recurso: ' + error.message);
    }
});

app.listen(PORT, () => {
    console.log(`Servidor escuchando en puerto ${PORT}`);
});