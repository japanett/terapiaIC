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
    email: { // dps precisa fazer a verificação (@exemplo.com) com regex?
        type: String,
        required: [true, 'email not specified'],
        trim: true,
        unique: true
    },
    pacients: [{
        name: {
            type: String,
            required: [true, 'Field not specified']
        },
        toPlay: [{
            gameID: {
                type: Number,
                required: false
            },
            config: {//this
                type: String,
                required: [false],
                default: 0
            },
            ordem: {
                type: Number,
                required: false,
                default: 1
            },
            idToPlay: { //this
                type: String,
                required: [false]
            },
            _id: false
        }],
        identifier: {
            type: String,
            required: [true, 'Field not specified'],
            unique: true
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