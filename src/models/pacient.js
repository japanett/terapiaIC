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
      required: [false]
    },
    config: { //
      type: String,
      required: false
    },
    _id: false
  }]
});

// const game2Schema = new Schema({
//     gameID: {
//         type: Number,
//         required: [true, 'Field not specified'],
//         default: 2
//     },
//     // session: {
//     //     type: Number,
//     //     required: false,
//     //     default: 1
//     // },
//     title: {
//         type: String,
//         required: false,
//     },
//     seconds: {
//         type: Number,
//         required: [true, 'Field not specified']
//     },
//     date: {
//         type: Date,
//         required: [true, 'Field not specified']
//     },
//     description: {
//         type: String,
//         required: false,
//         minimize: false
//     },
//     seconds: {
//         type: Number,
//         required: [true, 'Field not specified']
//     },
//     error: {
//         mao: {
//             type: Number,
//             required: false,
//             default: 0
//         },
//         caixa: {
//             type: Number,
//             required: false,
//             default: 0
//         }
//     }
//     // tags: [{
//     //     type: String,
//     //     required: true
//     // }]
// });

// const macaSchema = new Schema({
//     gameID: {
//         type: Number,
//         required: [true, 'Field not specified'],
//         default: 1
//     },
//     // session: {
//     //     type: Number,
//     //     required: false,
//     //     default: 1
//     // },
//     title: {
//         type: String,
//         required: false,
//     },
//     seconds: {
//         type: Number,
//         required: [true, 'Field not specified']
//     },
//     date: {
//         type: Date,
//         required: [true, 'Field not specified']
//     },
//     description: {
//         type: String,
//         required: false,
//         minimize: false
//     },
//     seconds: {
//         type: Number,
//         required: [true, 'Field not specified']
//     },
//     error: {
//         mao: {
//             type: Number,
//             required: false,
//             default: 0
//         },
//         caixa: {
//             type: Number,
//             required: false,
//             default: 0
//         }
//     }
//     // tags: [{
//     //     type: String,
//     //     required: true
//     // }]
// });

// module.exports = mongoose.model('MacaSchema', macaSchema);
// module.exports = mongoose.model('Game2Schema', game2Schema);
module.exports = mongoose.model('pacientSchema', pacientSchema);