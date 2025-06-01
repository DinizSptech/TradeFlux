const express = require("express");
const router = express.Router();
const alertaController = require("../controllers/alerta.controller");

router.post("/", alertaController.enviarJira);

router.post("/webhook", alertaController.receberWebhook);

module.exports = router;
