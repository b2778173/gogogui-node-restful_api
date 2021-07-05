const mongoose = require('mongoose');

const Image = mongoose.model(
    'image',
    new mongoose.Schema({
        name: String,
        desc: String,
        img: {
            data: Buffer,
            contentType: String
        }
    })
);

module.exports = Image;
