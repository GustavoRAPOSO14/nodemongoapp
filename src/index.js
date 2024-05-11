const express = require('express')
const handlebars = require('express-handlebars')
const bodyParser = require('body-parser')
const path = require('path')
const app = express()
const rota_equipes = require('./controllers/EquipeControllers')
const rota_jogadores = require('./controllers/JogadorControllers')


app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())
app.engine('handlebars', handlebars.engine({default: 'main'}))
app.set('view engine', 'handlebars')


app.use('/rota_equipes', rota_equipes)
app.use('/rota_jogadores', rota_jogadores)

app.get('/', (req, res) => {
    res.render('home')
})


const PORT = 8081
app.listen(PORT, () => {
    console.log("Servidor rodando")
})

