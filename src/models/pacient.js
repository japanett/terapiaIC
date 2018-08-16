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
        id: {
            type: String,
            required: [true, 'Field not specified']
        }
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
        // unique: true
    },
    active: {//this
        type: Boolean,
        required: false,
        default: true
    },
    toPlay: [{
        gameID: {
            type: Number,
            required: false
        },
        config: {//this
            type: String,
            required: [false]
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
    games: {
        gameMaca: [{
            gameID: {
                type: Number,
                required: false,
                default: 1
            },
            title: {
                type: String,
                required: false,
            },
            seconds: {
                type: Number,
                required: [true, 'Field not specified']
            },
            acertos: {
                type: Number,
                required: [true, 'Field not specified']
            },
            date: {
                type: Date,
                required: [true, 'Field not specified']
            },
            description: {
                type: String,
                required: false,
                minimize: false
            },
            error: {
                mao: {
                    type: Number,
                    required: false,
                    default: 0
                },
                caixa: {
                    type: Number,
                    required: false,
                    default: 0
                }
            },
            idToPlay: { //this
                type: String,
                required: [false]
            }
        }]
        // gameDois: [[game2Schema]]
    }
    //     // slug: { //   produto Cadeira Gamer = cadeira-gamer 
    //     //     type: String,
    //     //     required: false,
    //     //     trim: true,
    //     //     index: true,
    //     //     unique: true
    //     // },
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
module.exports = mongoose.model('PacientSchema', pacientSchema);