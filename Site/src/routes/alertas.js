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

router.get("/getAlertasUnsolved/:dataCenter", function (req,res) {
    alertaController.getAlertaUnsolved(req,res)
})
    
router.get("/getAlertasCalendario/:dataCenter", function (req, res) {
    alertaController.getAlertasCalendario(req, res);
})
router.get("/getStatusServidores/:dataCenter", function (req, res) {
    alertaController.getStatusServidores(req, res);
})
router.get("/getCorrelacao/:dataCenter", async function (req, res) {
    const lambdaURL = 'https://ttxj7v3f3t7uowg73ylwrx36vu0ljtjs.lambda-url.us-east-1.on.aws/';
    try {
        const response = await fetch(lambdaURL);
        const data = await response.json();
        res.json(data);
    } catch (error) {
        console.error("Erro ao buscar correlação:", error.message);
        res.status(500).json({ erro: "Erro ao buscar dados da Lambda" });
    }
});

module.exports = router;