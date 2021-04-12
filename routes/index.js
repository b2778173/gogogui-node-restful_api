const express = require('express');
const cors = require('cors');
const auth = require('../utils/auth');
const user = require('./user');

const app = express();

app.use(express.json());
app.use(cors());
app.use(auth);

app.use('/api/user', user);
// app.use('/api/stock', ticker)

module.exports = app;
