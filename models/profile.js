const Joi = require('joi');
const mongoose = require('mongoose');

const Watchlist = new mongoose.Schema({
    symbol: String,
    memo: String
});

const SocialMedia = new mongoose.Schema({
    facebookId: String,
    lineId: String
});
const Address = new mongoose.Schema({
    country: String,
    city: String,
    zipCode: String,
    street: String
});

const Profile = mongoose.model(
    'profile',
    new mongoose.Schema(
        {
            username: {
                type: String,
                required: true,
                minlength: 1,
                maxlength: 50
            },
            watchlist: {
                type: [Watchlist],
                default: []
            },
            name: {
                type: String,
                required: true
            },
            createTime: {
                type: Date,
                default: new Date()
            },
            email: {
                type: String,
                required: false
            },
            socialMedia: {
                type: SocialMedia,
                default: {
                    facebookId: '',
                    lineId: ''
                }
            },
            memo: {
                type: String,
                default: ''
            },
            address: {
                type: Address,
                default: {
                    country: 'TW',
                    city: '',
                    zipCode: '',
                    street: ''
                }
            },
            uid: {
                type: String,
                required: true,
                minlength: 1,
                unique: true
            }
        },
        { collection: 'profile' }
    )
);

function validate(body) {
    const watchlist = Joi.object({
        symbol: Joi.string().required(),
        memo: Joi.string().required().allow('')
    });

    const socialMedia = Joi.object().keys({
        facebookId: Joi.string().required().allow(''),
        lineId: Joi.string().required().allow('')
    });

    const address = Joi.object().keys({
        country: Joi.string().required().allow(''),
        city: Joi.string().required().allow(''),
        zipCode: Joi.string().required().allow(''),
        street: Joi.string().required().allow('')
    });

    const schema = Joi.object({
        username: Joi.string().required(),
        name: Joi.string().required(),
        createTime: Joi.date(),
        email: Joi.string(),
        socialMedia,
        watchlist: Joi.array().items(watchlist),
        memo: Joi.string(),
        address,
        uid: Joi.string()
    });

    return schema.validate(body);
}

module.exports = {
    Profile,
    validate
};
