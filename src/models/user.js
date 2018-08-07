'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Field not specified']
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
    email: { // dps precisa fazer a verificação (@exemplo.com) com regex?
        type: String,
        required: [true, 'email not specified'],
        trim: true,
        unique: true
    },
    pacients: [{
        name: {
            first: {
                type: String,
                required: [true, 'Field not specified']
            },
            last: {
                type: String,
                required: [true, 'Field not specified']
            }
        },
        toPlay: [{
            gameID: {
                type: Number,
                required: false
            },
            _id: false
        }],
        identifier: {
            type: String,
            required: [true, 'Field not specified']
        },
        active: {
            type: Boolean,
            required: false,
            default: true
        },
        _id: false
    }]
});

module.exports = mongoose.model('userSchema', userSchema);