const Joi = require('joi');
const mongoose = require('mongoose');

const History = new mongoose.Schema({
    quantity: Number,
    tradeTime: Date,
    tradePrice: Float32Array,
});
const Portfolio = mongoose.model(
    'portfolio',
    new mongoose.Schema({
        symbol: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
        },
        companyName: {
            type: String,
            required: true,
            minlength: 1,
            maxlength: 50,
        },
        history: {
            type: History,
        },
        tradeTime: {
            type: Date,
            required: true,
        },
        tradePrice: {
            type: Number,
            required: true,
        },
        marketPrice: {
            type: Number,
            required: true,
        },
        profitPercentage: {
            type: Number,
        },
        memo: {
            type: String,
        },
        uid: {
            type: String,
            required: true,
            minlength: 1,
        },
    })
);

function validPortfolio(portfolio) {
    const schema = {
        symbol: Joi.string().min(1).max(50).required(),
        phone: Joi.string().min(5).max(50).required(),
        isGold: Joi.boolean(),
    };

    return Joi.validate(portfolio, schema);
}

exports.module = { Portfolio };
exports.validate = validPortfolio;