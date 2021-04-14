const express = require('express');
const cors = require('cors');
const auth = require('../middleware/auth');
const user = require('./user');
const portfolio = require('./portfolio');

const app = express();

app.use(express.json());
app.use(cors());
// verify token middleware (idToken need be granted from frontend)
app.use(auth);

app.use('/api/user', user);
app.use('/api/portfolio', portfolio);

module.exports = app;
