const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const auth = require('../middleware/auth');
const user = require('./user');
const market = require('./finnhub/market');
const stock = require('./finnhub/stock');
const portfolio = require('./portfolio');

const app = express();

app.use(express.json());
app.use(cors());
app.use(morgan('combined'));
// verify token middleware (idToken need be granted from frontend)
app.use(auth);

app.use('/api/user', user);
app.use('/api/news', market);
app.use('/api/stock', stock);
app.use('/api/portfolio', portfolio);

module.exports = app;
