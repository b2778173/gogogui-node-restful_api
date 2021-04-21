const express = require('express');
const finnhubClient = require('./index');

const router = express.Router();

router.get('/', (req, res) => {
    const { category } = req.query;
    finnhubClient.generalNews(category, {}, (error, data) => {
        if (error) {
            res.send({ message: error.response.text });
        } else {
            res.send({ result: data });
        }
    });
});

router.get('/company_news', (req, res) => {
    const { symbol, from, to } = req.query;
    finnhubClient.companyNews(symbol, from, to, (error, data) => {
        if (error) {
            res.send({ message: error.response.text });
        } else {
            res.send({ result: data });
        }
    });
});

module.exports = router;
