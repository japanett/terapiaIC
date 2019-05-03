'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const adminSchema = new Schema({
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
    },
    admin: {
        type: Boolean,
        required: true,
        default: true
    }
});

module.exports = mongoose.model('adminSchema', adminSchema);