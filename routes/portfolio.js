const express = require('express');

const router = express.Router();
const { Portfolio, validate } = require('../models/portfolio');

router.get('/:uid', async (req, res) => {
    const { uid } = req.params;
    try {
        const portfolio = await Portfolio.find({ uid });
        res.send({ result: portfolio });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.post('/:uid', async (req, res) => {
    try {
        // validation
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        req.body.uid = req.params.uid;

        let portfolio = null;
        const { symbol, companyName, quantity, tradePrice, marketPrice, memo } = req.body;
        portfolio = await Portfolio.findOne({ symbol });

        if (portfolio) {
            portfolio.history.push({
                quantity,
                tradePrice,
                tradeTime: new Date()
            });
        } else {
            portfolio = new Portfolio({
                symbol,
                companyName,
                tradePrice,
                marketPrice,
                history: [{ quantity, tradePrice, tradeTime: new Date() }],
                memo,
                uid: req.params.uid
            });
        }
        await portfolio.save();
        res.send({ result: portfolio });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
