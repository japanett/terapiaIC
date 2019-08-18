'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const logger = require('./winston');

require('dotenv').config();

const app = express();

// Conecta ao Banco
mongoose.connect(process.env.DB_URL, {useNewUrlParser: true}, function (err) {
    if (err) throw logger.error(err);
});
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', function(e) {logger.error('MongoDB connection error:' + e)});

// Carrega Models
require('./models/pacient');
require('./models/user');
require('./models/games');
require('./models/admin');

// Carrega rotas
const index = require('./routes/index');
const login = require('./routes/login-route');
const admin = require('./routes/admin-route');
const pacientsRoute = require('./routes/pacient-route');
const userRoute = require('./routes/user-route');

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/', index);
app.use('/api/auth', login);
app.use('/api/admin', admin);
app.use('/api/pacient', pacientsRoute);
app.use('/api/user', userRoute);

module.exports = app;

