const express = require('express');
const axios = require('axios');
const logger = require('debug')('General');
const finnhubClient = require('./index');

const router = express.Router();

// Stock candles
router.get('/candle', (req, res) => {
    logger(req.query);
    const { symbol, resolution, from, to } = req.query;
    finnhubClient.stockCandles(symbol, resolution, from, to, {}, async (error, data) => {
        if (error) {
            res.send({ message: error.response.text });
        } else if (data.s === 'ok') {
            const formatData = data.o.map((e, i) => {
                return {
                    date: data.t[i] * 1000,
                    open: data.o[i],
                    height: data.h[i],
                    volumn: data.v[i],
                    close: data.c[i]
                };
            });
            res.send({ result: formatData });
        } else {
            res.send({ result: [] });
        }
    });
});

// symbol lookup
router.get('/lookup', async (req, res) => {
    logger(req.query);
    const { symbol } = req.query;
    try {
        const r = await axios(
            `https://finnhub.io/api/v1/search?q=${symbol}&token=${process.env.API_KEY}`
        );
        res.send(r.data);
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
});
// Quote
router.get('/quote', (req, res) => {
    const { symbol } = req.query;
    // const { symbols } = req.body;
    finnhubClient.quote(symbol, (error, data) => {
        if (error) {
            res.send({ message: error.response.text });
        } else {
            res.send({ result: data });
        }
    });
});

// get all symbol list
router.get('/getSymbolList', async (req, res) => {
    logger(req.query);
    const { exchange } = req.query;
    try {
        const r = await axios(
            `https://finnhub.io/api/v1/stock/symbol?exchange=${exchange}&token=${process.env.API_KEY}`
        );
        res.send({ result: r.data });
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
});

module.exports = router;
