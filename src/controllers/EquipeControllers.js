const express = require('express');
const router = express.Router()
const Equipe = require("../models/Equipe")


router.get('/equipes', (req, res) => {
    Equipe.find().lean().then((equipes) => {
        res.render("admin/equipes/equipes", { equipes: equipes})
    })
})

router.get('/equipes/add', (req, res) => {
    res.render('admin/equipes/addequipes')
})

router.post('/equipes/nova', (req, res) => {
    var equipe = new Equipe();
    equipe.nome = req.body.nome
    equipe.ano = req.body.ano
    equipe.pais = req.body.pais
    equipe.mundial = req.body.mundial

    equipe.save().then(() => {
        res.redirect('/rota_equipes/equipes')
    }).catch((erro) => {
        res.send('Houve um erro: ' + erro)
    })
})


router.get('/editar_equipes/:id', (req, res) => {
    Equipe.findOne({_id:req.params.id}).lean().then((equipes) => {
        res.render('admin/equipes/editequipes', {equipe: equipes})
    })
})

router.post('/equipes/editar_equipes', (req, res) => {
    Equipe.updateOne({_id:req.body._id},
        {$set:{nome:req.body.nome, ano:req.body.ano, pais:req.body.pais, 
        mundial:req.body.mundial}}).then(() => {
            res.redirect('/rota_equipes/equipes')
        })
})

router.get('/deletar_equipes/:id', (req, res) => {
    Equipe.deleteMany({_id:req.params.id}).then(() => {
        res.redirect('/rota_equipes/equipes')
    })
})

module.exports = router