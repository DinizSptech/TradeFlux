const express = require("express");
const router = express.Router()
const alertaController = require("../controllers/alerta.controller");

    // Request me geraria informações sobre a requisição
    // Response define a resposta de quando bater nessa rota
    // response.status Serve para saber o status da requisição

router.post('/', (req,res) =>{
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        alertaController.validarAlerta(req,res)
    } else {
        res.send('Erro no router/index: Dados no formato errado.')
    }
})


module.exports = router;