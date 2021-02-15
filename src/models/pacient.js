'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const pacientSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Field not specified']
    },
    age: {
        type: Number,
        required: [true, 'Field not specified']
    },
    medic: {
        type: String,
        required: [true, 'Field not specified']
    },
    sexo: {
        type: String,
        required: false
    },
    gmfcs: {
        type: Number,
        required: false,
        default: 0
    },
    mao_dominante: {
        type: String,
        required: false,
        default: 'direita'
    },
    patologia: {
        type: String,
        required: false
    },
    objetivo: {
        type: String,
        required: false
    },
    identifier: {
        type: String,
        required: [true, 'identifier not specified'],
    },
    active: {
        type: Boolean,
        required: false,
        default: true
    },
    games: [{
        gameID: {
            type: String,
            required: [true]
        },
        config: { //
            type: String,
            required: false
        },
        title: { //
            type: String,
            required: false
        },
        time: { //
            type: String,
            required: false,
            default: ""
        },
        imersiveMode: {
            type: Boolean,
            required: false,
            default: true
        },
        _id: false
    }]
});

module.exports = mongoose.model('pacientSchema', pacientSchema);
