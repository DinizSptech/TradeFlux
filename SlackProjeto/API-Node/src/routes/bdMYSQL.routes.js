const express = require("express");
const router = express.Router()

    // Request me geraria informações sobre a requisição
    // Response define a resposta de quando bater nessa rota
    // response.status Serve para saber o status da requisição

router.post("/bdInserir", (request, response) => {
    contentType = request.headers['content-type']

    if (contentType == 'application/json') {
        
    } else {
        response.status(400).send("Envie um arquivo JSON")
    }

})

module.exports = router;