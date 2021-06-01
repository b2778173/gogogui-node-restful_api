const Joi = require('joi');
const mongoose = require('mongoose');

const History = new mongoose.Schema({
    quantity: Number,
    tradeTime: Date,
    tradePrice: Number
});
const Portfolio = mongoose.model(
    'portfolio',
    new mongoose.Schema(
        {
            symbol: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 50
            },
            companyName: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 50
            },
            history: {
                type: [History]
            },
            tradePrice: {
                type: Number,
                required: true
            },
            quantity: {
                type: Number,
                require: true
            },
            marketPrice: {
                type: Number,
                required: true
            },
            profitPercentage: {
                type: Number,
                default: 0
            },
            memo: {
                type: String
            },
            uid: {
                type: String,
                required: true,
                minlength: 1
            }
        },
        { collection: 'portfolio' }
    )
);

function validate(body) {
    const history = Joi.object({
        quantity: Joi.number(),
        tradePrice: Joi.number()
    });
    const schema = Joi.object({
        symbol: Joi.string().min(1).max(50).required(),
        companyName: Joi.string(),
        quantity: Joi.number(),
        tradePrice: Joi.number(),
        marketPrice: Joi.number(),
        profit: Joi.number(),
        profitPercentage: Joi.number(),
        history: Joi.array().items(history),
        memo: Joi.string()
    });

    return schema.validate(body);
}

module.exports = {
    Portfolio,
    validate
};
