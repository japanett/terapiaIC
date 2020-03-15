'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cors = require('cors');
const logger = require('./winston');

require('dotenv').config();

const app = express();

// Conecta ao Banco
const options =  { keepAlive: 1, connectTimeoutMS: 30000, reconnectTries: 30, reconnectInterval: 5000, useNewUrlParser: true };
mongoose.connect(process.env.DB_URL, options, function (err) {
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
const gameRoute = require('./routes/game-route');

// Habilita o CORS
/*
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS, PATCH');
    next();
});
*/

app.use(cors({
    allowedHeaders:['Origin', 'X-Requested-With', 'Content-Type', 'Accept', 'x-access-token']
}));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/api/', index);
app.use('/api/auth', login);
app.use('/api/admin', admin);
app.use('/api/pacient', pacientsRoute);
app.use('/api/user', userRoute);
app.use('/api/game', gameRoute);

module.exports = app;
