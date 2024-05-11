const db = require('./db');
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const EquipeSchema = new Schema({
    nome:{
        type:String,
        required: true
    },
    ano: {
        type: Number,
        required: true
    },
    pais: {
        type: String,
        required: true
    },
    mundial: {
        type: Number,
        required: true
    }
}, {collection: 'equipe'})

const Equipe = mongoose.model("equipe", EquipeSchema);

module.exports = Equipe;