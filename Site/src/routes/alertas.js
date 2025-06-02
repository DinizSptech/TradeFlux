var express = require("express");
var router = express.Router();

var alertaController = require("../controllers/alertaController");

router.get("/exibirAlertas/:dataCenter", function (req, res) {
    alertaController.exibirAlertas(req, res);
})
router.get("/getTotalAlertas/:dataCenter", function (req, res) {
    alertaController.getTotalAlertas(req, res);
})
router.get("/getQtdAlertasComponente/:dataCenter", function (req, res) {
    alertaController.getQtdAlertasComponente(req, res);
})

router.get("/getTopServidoresAlertas/:dataCenter", function (req, res) {
    alertaController.getTopServidoresAlertas(req, res);
})

router.get("/getAlertasCalendario/:dataCenter", function (req, res) {
    alertaController.getAlertasCalendario(req, res);
})
router.get("/getStatusServidores/:dataCenter", function (req, res) {
    alertaController.getStatusServidores(req, res);
})

module.exports = router;