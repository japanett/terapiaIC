'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'name not specified']
    },
    login: {
        type: String,
        required: [true, 'login not specified !'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'password not specified !']
    },
    email: {
        type: String,
        required: [true, 'email not specified'],
        trim: true,
        unique: true
    },
    pacients: [{
        identifier: {
            type: String
        },
        _id: false
    }]
});

module.exports = mongoose.model('userSchema', userSchema);