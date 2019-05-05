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
  imersiveMode: {
    type: Boolean,
    required: false,
    default: true
  },
  observation: {
    type: String,
    required: false,
    default: ""
  },
  config: {
    type: String,
    required: false
  },
  date: {
    type: Date,
    required: false,
    default: null
  },
  score: {
    esquerda: {
      type: Number,
      required: false,
      default: null
    },
    direita: {
      type: Number,
      required: false,
      default: null
    },
    cruzada: {
      type: Number,
      required: false,
      default: null
    }
  },
  error: {
    esquerda: {
      type: Number,
      required: false,
      default: null
    },
    direita: {
      type: Number,
      required: false,
      default: null
    },
    cruzada: {
      type: Number,
      required: false,
      default: null
    }
  },
  gameID: {
    type: Number,
    required: [true, 'gameID not specified']
  },
  time: {
    type: Number,
    required: false,
    default: null
  }
});

module.exports = mongoose.model('gameSchema', gameSchema);