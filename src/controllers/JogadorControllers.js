const express = require('express');
const router = express.Router()
const Jogador = require("../models/Jogador")
const Equipe = require("../models/Equipe")


router.get('/jogadores', (req, res) => {
    Jogador.find().lean().then((jogadores) => {
        res.render("admin/jogadores/jogadores", { jogadores: jogadores})
    })
})

router.get('/jogadores/add', (req, res) => {

    Equipe.find().lean().then((equipes) => {
        var nequipes = JSON.parse(JSON.stringify(equipes));
        res.render('admin/jogadores/addjogadores', {equipes: nequipes})
    })
})

router.post('/jogadores/nova', (req, res) => {
    var jogador = new Jogador();
    jogador.nome = req.body.nome
    jogador.idade = req.body.idade
    jogador.posicao = req.body.posicao
    jogador.time = req.body.time

    jogador.save().then(() => {
        res.redirect('/rota_jogadores/jogadores')
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro)
    })
})


router.get('/editar_jogadores/:id', (req, res) => {
    Jogador.findOne({_id:req.params.id}).lean().then((jogadores) => {
        
        Equipe.find().lean().then((equipes) => {
            var nequipes = JSON.parse(JSON.stringify(equipes))
            var njogadores = JSON.parse(JSON.stringify(jogadores))
            res.render('admin/jogadores/editjogadores', {equipes: nequipes, jogador: jogadores})
        })
    })
})

router.post('/jogadores/editar_jogadores', (req, res) => {
    Jogador.updateOne({_id:req.body._id},
        {$set:{nome:req.body.nome, idade:req.body.idade, posicao:req.body.posicao, 
        time:req.body.time}}).then(() => {
            res.redirect('/rota_jogadores/jogadores')
        })
})

router.get('/deletar_jogadores/:id', (req, res) => {
    Jogador.deleteMany({_id:req.params.id}).then(() => {
        res.redirect('/rota_jogadores/jogadores')
    })
})

module.exports = router