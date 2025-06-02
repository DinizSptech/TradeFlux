const express = require("express");
const router = express.Router();
const bucketController = require("../controllers/bucket.controller");

// Request me geraria informações sobre a requisição
// Response define a resposta de quando bater nessa rota
// response.status Serve para saber o status da requisição

router.post("/foto", (request, response) => {
    // Essa validação abaixo é pra ver se o tipo é JSON para ter certeza que não tá tendo nenhum problema
    const contentType = request.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
        bucketController.salvarFoto(request, response);
    } else {
        response.status(400).send("Envie um arquivo JSON");
    }
});

router.get("/foto", (request, response) => {
    bucketController.pegarFoto(request, response);
});

// Nova rota para capturas de dados
router.post("/capturas", (request, response) => {
    const contentType = request.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
        bucketController.salvarCaptura(request, response);
    } else {
        response.status(400).send("Envie um arquivo JSON");
    }
});

// Nova rota para alertas
router.post("/alertas", (request, response) => {
    const contentType = request.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
        bucketController.salvarAlerta(request, response);
    } else {
        response.status(400).send("Envie um arquivo JSON");
    }
});

// Rota para verificar status dos buffers
router.get("/status", bucketController.obterStatusBuffers);

router.post("/monitoramento", (request, response) => {
    const contentType = request.headers["content-type"];

    if (contentType && contentType.includes("application/json")) {
        bucketController.salvarMonitoria(request, response);
    } else {
        response.status(400).send("Envie um arquivo JSON");
    }
});

// router.get("/pix", bucketController.pegarPix);

// router.get("/pix", (request, response) => {
//   response.header("Content-Security-Policy", "connect-src 'self'");

//   bucketController.pegarPix().then((data) => response.json(data));
// });

// Tbm pode ser declarado da maneira abaixo que basicamente só muda a forma de leitura

// router
//     .route("/teste")
//     .get((request, response) => {

// })

module.exports = router;