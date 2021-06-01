const express = require('express');
// verify token middleware (idToken need be granted from frontend)
const auth = require('../middleware/auth');

const router = express.Router();
const { Portfolio, validate } = require('../models/portfolio');

router.get('/', auth, async (req, res) => {
    const { uid } = req.currentUser;
    try {
        const portfolio = await Portfolio.find({ uid });
        res.send({ result: portfolio });
    } catch (e) {
        res.status(400).send(e.message);
    }
});
// delete = quantity -1
router.post('/', auth, async (req, res) => {
    try {
        // validation
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });

        // req.body.uid = req.params.uid;
        const { uid } = req.currentUser;

        let portfolio = null;
        const { symbol, companyName, quantity, tradePrice, marketPrice, memo } = req.body;
        portfolio = await Portfolio.findOne({ symbol, uid });

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
                uid
            });
        }
        await portfolio.save();
        res.send({ result: portfolio });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

module.exports = router;
