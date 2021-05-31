const Joi = require('joi');
const mongoose = require('mongoose');

const Watchlist = mongoose.model(
    'watchlist',
    new mongoose.Schema(
        {
            _id: {
                type: String,
                minlength: 1,
                maxlength: 10
            },
            marketCap: {
                type: String,
                required: false,
                minlength: 1,
                maxlength: 50
            },
            price: {
                type: String,
                required: false
            },
            uid: {
                type: String,
                required: true,
                minlength: 1
            }
        },
        { collection: 'watchlist' }
    )
);

function validate(body) {
    const schema = Joi.object({
        symbol: Joi.string().min(1).max(8).required(),
        description: Joi.string(),
        currency: Joi.string(),
        displaySymbol: Joi.string(),
        figi: Joi.string(),
        mic: Joi.string(),
        type: Joi.string()
    });
    return schema.validate(body);
}

module.exports = {
    Watchlist,
    validate
};
