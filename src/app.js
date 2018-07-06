'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const config = require('./config');

const app = express();
const router = express.Router();

// Conecta ao Banco
mongoose.connect(config.connectionString, function (err) {
    if (err) throw err;
});
mongoose.Promise = global.Promise;
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// Carrega Models
const Pacient = require('./models/pacient');
const User = require('./models/user');

// Carrega rotas
const index = require('./routes/index');
const login = require('./routes/login-route');
const pacientsRoute = require('./routes/pacient-route');
const userRoute = require('./routes/user-route');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false
}));

app.use('/', index);
app.use('/login', login);
app.use('/pacients', pacientsRoute);
app.use('/user', userRoute);

// Habilita o CORS
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, x-access-token');
    res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
});

module.exports = app;

