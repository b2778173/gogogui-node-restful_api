const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const user = require('./user');
const market = require('./finnhub/market');
const stock = require('./finnhub/stock');
const portfolio = require('./portfolio');
const watchlist = require('./watchlist');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));

app.use('/api/user', user);
app.use('/api/news', market);
app.use('/api/stock', stock);
app.use('/api/portfolio', portfolio);
app.use('/api/watchlist', watchlist);

module.exports = app;
