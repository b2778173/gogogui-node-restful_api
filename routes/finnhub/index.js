require('dotenv').config();
const finnhub = require('finnhub');

const { api_key } = finnhub.ApiClient.instance.authentications;
api_key.apiKey = process.env.API_KEY; // Replace this
const finnhubClient = new finnhub.DefaultApi();

module.exports = finnhubClient;
