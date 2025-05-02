var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");

router.get("/listarServidores", function (req, res) {
    componenteController.listarServidores(req, res);
})

router.post("/cadastrar", function (req, res) {
    componenteController.cadastrar(req, res);
})

router.get("/listarComponentes/:servidor", function (req, res) {
    componenteController.listarComponentes(req, res);
})

router.get("/exibirComponentes/:dataCenter", function (req, res) {
    componenteController.exibirComponentes(req, res);
})

router.delete("/excluir/:componenteSelecionadoParaExcluir", function (req, res) {
    componenteController.excluir(req, res);
})

router.put("/editarComponente", function (req, res) {
    componenteController.editarComponente(req, res);
})

module.exports = router;