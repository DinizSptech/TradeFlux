const express = require("express");
const router = express.Router()
const bdController = require('../controllers/bdMYSQL.controllers')
    // Request me geraria informações sobre a requisição
    // Response define a resposta de quando bater nessa rota
    // response.status Serve para saber o status da requisição

router.post("/cadastrar_servidor", (req, res) => {
    contentType = request.headers['content-type']
    if (contentType == 'application/json') {
        bdController.cadastrarServidor(req,res)
    } else {
        res.status(400).send("Erro router bd/cadastrar: Envieum arquivo JSON")
    }

})

router.get("/servidor/:id", (req, res) => {
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        
    } else {
        res.status(400).send("Erro router bd/servidor: Envieum arquivo JSON")
    }

})


router.get("/parametros/:id", (req,res) =>{
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        
    } else {
        response.status(400).send("Erro router bd/parametros: Envie um arquivo JSON")
    }

})


module.exports = router;