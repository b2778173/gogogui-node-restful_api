const express = require('express');

const router = express.Router();
const { Watchlist, validate } = require('../models/watchlist');

router.post('/addWatchlist', async (req, res) => {
    try {
        // validation
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const { symbol } = req.body;
        // eslint-disable-next-line no-underscore-dangle
        const _id = symbol;

        const addedWatchlist = new Watchlist({
            _id
        });
        await addedWatchlist.save();
        res.send({ result: addedWatchlist });
    } catch (e) {
        console.log(e);
        res.status(400).send(e.message);
    }
});

router.delete('/rmWatchlist', async (req, res) => {
    try {
        // validation
        const { error } = validate(req.query);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const { symbol } = req.query;
        // eslint-disable-next-line no-underscore-dangle
        const _id = symbol;

        const removedWatchlist = new Watchlist({
            _id
        });
        await removedWatchlist.remove();
        res.send({ result: removedWatchlist });
    } catch (e) {
        res.status(400).send(e.message);
    }
});

router.get('/getAllWatchlist', async (req, res) => {
    try {
        const watchlist = await Watchlist.find({});
        res.send({ result: watchlist });
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
});

module.exports = router;
