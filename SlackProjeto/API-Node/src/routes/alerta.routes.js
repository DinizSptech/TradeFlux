const express = require("express");
const router = express.Router()
const alertaController = require("../controllers/alerta.controller");

    // Request me geraria informações sobre a requisição
    // Response define a resposta de quando bater nessa rota
    // response.status Serve para saber o status da requisição

router.post('/enviar', (req,res) =>{
    contentType = req.headers['content-type']

    if (contentType == 'application/json') {
        alertaController.enviarJira(req,res)
    } else {
        res.send('Erro no router/index: Dados no formato errado.')
    }
})


module.exports = router;