const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const user = require('./user');
const market = require('./finnhub/market');
const stock = require('./finnhub/stock');
const portfolio = require('./portfolio');
const watchlist = require('./watchlist');
const profile = require('./profile');
const image = require('./image');
const auth = require('../middleware/auth');

const app = express();

app.use(express.json({ limit: '2100000kb' }));
app.use(cors());
app.use(morgan('combined'));

app.use('/api/user', auth, user);
app.use('/api/news', market);
app.use('/api/stock', stock);
app.use('/api/portfolio', auth, portfolio);
app.use('/api/watchlist', watchlist);
app.use('/api/profile', auth, profile);
app.use('/api/image', image);

module.exports = app;
