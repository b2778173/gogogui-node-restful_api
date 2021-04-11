const express = require('express');
const user = require('./user');

const app = express();

app.use(express.json());

app.use('/api/user', user);
// app.use('/api/stock', ticker)

module.exports = app;