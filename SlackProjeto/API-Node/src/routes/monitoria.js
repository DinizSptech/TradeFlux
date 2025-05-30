const express = require("express");
const router = express.Router()
const monitoriaController = require("../controllers/monitoria.controller");

    // Request me geraria informações sobre a requisição
    // Response define a resposta de quando bater nessa rota
    // response.status Serve para saber o status da requisição

router.post('/', (req,res) =>{
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        monitoriaController.validarAlerta(req,res)
    } else {
        res.send('Erro no router/index: Dados no formato errado.')
    }
})


module.exports = router;