'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
    title: {
        type: String,
        required: [true, 'title not specified']
    },
    pacient: {
        type: String,
        required: false
    },
    config: {
        type: String,
        required: false
    },
    medic: {
        type: String,
        required: [true, 'medic not specified !']
    },
    date: {
        type: Date,
        required: false,
        default: null
    },
    score: {
        type: Number,
        required: false,
        default: null
    },
    error: {
        type: Number,
        required: false,
        default: null
    },
    idToPlay: { //this
        type: String,
        required: [true, 'idToPlay not specified']
    },
    gameID: {
        type: Number,
        required: [true, 'gameID not specified']
    },
    time: {
        type: Number,
        required: false,
        default: null
    },
    played:{
        type:Boolean,
        required: false,
        default: false
    }
});

module.exports = mongoose.model('gameSchema', gameSchema);