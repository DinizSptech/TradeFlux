var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/exibirAlertas/:dataCenter", function (req, res) {
    alertaController.exibirAlertas(req, res);
})

module.exports = router;