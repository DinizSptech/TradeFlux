var express = require("express");
var router = express.Router();

var componenteController = require("../controllers/componenteController");


router.get("/listarServidores", function (req, res) {
    componenteController.listarServidores(req, res);
})

module.exports = router;