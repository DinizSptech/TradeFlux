const express = require("express");
const router = express.Router()
const indexController = require("../controllers/index.controller");

    // Request me geraria informações sobre a requisição
    // Response define a resposta de quando bater nessa rota
    // response.status Serve para saber o status da requisição

router.post('/:id', (req,res) =>{
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        indexController.receberParametro(req,res)
    }
})

router.post('/', (req,res) =>{
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        indexController.validarAlerta(req,res)
    } else {
        res.send('E')
    }
})


module.exports = router;