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
        // eslint-disable-next-line no-underscore-dangle
        const _id = symbol;
        // check is unique first
        const num = await Watchlist.count({ _id, uid });
        if (num) {
            throw new Error('symbol already exist');
        }

        const addedWatchlist = new Watchlist({
            _id,
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
        const _id = symbol;

        // check is not unique first
        const num = await Watchlist.count({ _id, uid });
        if (!num) {
            throw new Error('watchlist not found');
        }
        // const removedWatchlist = new Watchlist();
        const result = await Watchlist.remove({
            _id,
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
