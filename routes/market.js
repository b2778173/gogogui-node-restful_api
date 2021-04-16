const express = require('express');
const finnhub = require('finnhub');

const router = express.Router();
const { api_key } = finnhub.ApiClient.instance.authentications;
api_key.apiKey = process.env.API_KEY; // Replace this
const finnhubClient = new finnhub.DefaultApi();

router.get('/company_news', (req, res) => {
    const { symbol, from, to } = req.query;
    finnhubClient.companyNews(symbol, from, to, (error, data, response) => {
        if (error) {
            res.send({ message: error });
        } else {
            res.send({ result: data });
        }
    });
});

module.exports = router;
