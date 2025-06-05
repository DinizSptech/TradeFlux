const express = require("express");
const router = express.Router();
const bdController = require('../controllers/bdMYSQL.controller');

// Corrigido: request -> req, response -> res
router.post("/cadastrar_servidor", (req, res) => {
    const contentType = req.headers['content-type'];
    if (contentType === 'application/json') {
        bdController.cadastrar_servidor(req, res);
    } else {
        res.status(400).send("Erro router bd/cadastrar: Envie um arquivo JSON");
    }
});

router.post("/cadastrar_parametros", (req, res) => {
    const contentType = req.headers['content-type'];
    if (contentType === 'application/json') {
        bdController.cadastrar_parametros(req, res);
    } else {
        res.status(400).send("Erro router bd/cadastrar parametros: Envie um arquivo JSON");
    }
});

router.get("/servidor/:uuid", (req, res) => {
    const contentType = req.headers['content-type'];
    // Removido check de content-type para GET (não é necessário)
    bdController.buscar_servidor(req, res);
});

router.get("/parametros/:id", (req, res) => {
    const contentType = req.headers['content-type'];
    // Removido check de content-type para GET (não é necessário)  
    bdController.buscar_parametro(req, res);
});

module.exports = router;