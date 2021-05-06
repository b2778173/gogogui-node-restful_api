const express = require('express');
const axios = require('axios');

const router = express.Router();

// symbol lookup
router.get('/getSymbolList', async (req, res) => {
    try {
        const r = await axios(
            `https://financialmodelingprep.com/api/v3/search?query=AA&limit=10&exchange=NASDAQ&apikey=demo`
        );
        res.send(r.data);
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
});
