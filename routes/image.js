const express = require('express');
const logger = require('debug')('General');
const multer = require('multer');
const path = require('path');
const auth = require('../middleware/auth');

const router = express.Router();

// AFTER : Create multer object
const imageUpload = multer({
    storage: multer.diskStorage({
        destination(req, file, cb) {
            cb(null, `public/images`);
        },
        filename(req, file, cb) {
            cb(null, `${new Date().valueOf()}_${file.originalname}`);
        }
    })
});

// Image Upload Routes
router.post('/', auth, imageUpload.single('image'), (req, res) => {
    try {
        logger(req.file);
        const hostname = req.headers.host; // hostname = 'localhost:8080'

        if (!req.file) {
            return res.status(400).send({
                result: {
                    message: 'Please upload a image!'
                }
            });
        }
        return res.status(200).send({
            result: {
                message: `Uploaded the image successfully: `,
                filename: req.file.filename,
                url: `http://${hostname}/api/image/${req.file.filename}`
            }
        });
    } catch (e) {
        res.status(400).send({
            result: {
                message: `Could not upload the image: ${req.file.originalname}. ${e}`
            }
        });
    }
});

// Image Get Routes
router.get('/:filename', (req, res) => {
    try {
        const { filename } = req.params;
        const dirname = path.resolve();
        const fullfilepath = path.join(dirname, `public/images/${filename}`);
        console.log(fullfilepath);
        return res.sendFile(fullfilepath);
    } catch (e) {
        res.status(404).send({
            message: `${e}`
        });
    }
});

module.exports = router;
