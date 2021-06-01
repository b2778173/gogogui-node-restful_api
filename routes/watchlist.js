const express = require('express');

const router = express.Router();
const { Watchlist, validate } = require('../models/watchlist');
const auth = require('../middleware/auth');

router.post('/', auth, async (req, res) => {
    const { uid } = req.currentUser;
    try {
        // validation
        const { error } = validate(req.body);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const { symbol } = req.body;
        // check is unique first
        const num = await Watchlist.count({ symbol, uid });
        if (num) {
            throw new Error('symbol already exist');
        }

        const addedWatchlist = new Watchlist({
            symbol,
            uid
        });
        await addedWatchlist.save();
        res.send({ result: addedWatchlist });
    } catch (e) {
        console.log(e);
        res.status(400).send({ message: e.message });
    }
});

router.delete('/', auth, async (req, res) => {
    const { uid } = req.currentUser;
    try {
        // validation
        const { error } = validate(req.query);
        if (error) return res.status(400).send({ message: error.details[0].message });
        const { symbol } = req.query;
        // eslint-disable-next-line no-underscore-dangle

        // check is not unique first
        const num = await Watchlist.count({ symbol, uid });
        if (!num) {
            throw new Error('watchlist not found');
        }
        // const removedWatchlist = new Watchlist();
        const result = await Watchlist.remove({
            symbol,
            uid
        });
        res.send({ result: `${result.deletedCount} document delete` });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
});

router.get('/', auth, async (req, res) => {
    const { uid } = req.currentUser;
    try {
        const watchlist = await Watchlist.find({ uid });
        res.send({ result: watchlist });
    } catch (e) {
        console.log(e);
        res.send({ message: e });
    }
});

module.exports = router;
