const db = require('./db');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const JogadorSchema = new Schema({
    nome:{
        type:String,
        required: true
    },
    idade: {
        type: Number,
        required: true
    },
    posicao: {
        type: String,
        required: true
    },
    time: {
        type: String,
        required: true
    }
}, {collection: 'jogadores'})

const Jogador = mongoose.model("jogadores", JogadorSchema);

module.exports = Jogador;