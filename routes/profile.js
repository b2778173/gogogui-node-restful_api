const express = require('express');
const logger = require('debug')('General');
const auth = require('../middleware/auth');

const router = express.Router();
const { Profile, validate } = require('../models/profile');

router.get('/', auth, async (req, res) => {
    const { uid } = req.currentUser;
    try {
        const profile = await Profile.findOne({ uid });
        if (!profile) {
            return res.status(404).send({ message: 'profile not found' });
        }
        // delete unecessary key
        profile.socialMedia = undefined;
        console.log(profile);

        res.send({ result: profile });
    } catch (e) {
        res.status(400).send({ message: e.message });
    }
});
// delete = quantity -1
router.post('/', auth, async (req, res) => {
    logger(req.body);
    try {
        const { uid } = req.currentUser;
        let profile = null;
        profile = await Profile.findOne({ uid });
        if (profile) {
            throw new Error('same uid user already exist');
        }

        const {
            symbol,
            username,
            name,
            createTime,
            email,
            socialMedia,
            watchlist,
            memo,
            address
        } = req.body;

        profile = new Profile({
            symbol,
            username,
            name,
            createTime,
            email,
            socialMedia,
            watchlist,
            memo,
            address,
            uid
        });

        const result = await profile.save();
        res.send({ result });
    } catch (e) {
        logger(e);
        res.status(400).send({ message: e.message });
    }
});

router.put('/', auth, async (req, res) => {
    logger(req.body);
    const { uid } = req.currentUser;
    const { socialMedia, memo, address, username, name, watchlist, email, photoURL } = req.body;
    try {
        // validation
        const { error } = validate(req.body);
        if (error) {
            console.log(error);
            throw new Error(error.details[0].message);
        }

        const profile = await Profile.findOneAndUpdate(
            { uid },
            { socialMedia, memo, address, username, name, watchlist, email, photoURL },
            { new: true, upsert: true }
        );
        if (!profile) {
            return res.status(404).send({ message: 'profile not found' });
        }
        res.send({ result: profile });
    } catch (e) {
        logger(e);
        res.status(400).send({ message: e.message });
    }
});

router.delete('/', auth, async (req, res) => {
    logger(req.body);
    const { uid } = req.currentUser;
    try {
        const profile = await Profile.findOneAndDelete({ uid });
        if (!profile) {
            return res.status(404).send({ message: 'profile not found' });
        }
        res.send({ result: profile });
    } catch (e) {
        logger(e);
        res.status(400).send({ message: e.message });
    }
});

module.exports = router;
