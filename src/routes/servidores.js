var express = require("express");
var router = express.Router();

var servidorController = require("../controllers/servidorController");

router.post("/cadastrar", function (req, res) {
    servidorController.cadastrar(req, res);
})

router.get("/listarDataCenters", function (req, res) {
    servidorController.listarDataCenters(req, res);
})


router.get("/exibirServidores/:dataCenter", function (req, res) {
    servidorController.exibirServidores(req, res);
})

module.exports = router;