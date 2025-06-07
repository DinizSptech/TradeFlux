const express = require("express");
const router = express.Router();
const CSVscontroller = require('../controllers/CSVs.controller');

router.get("/csvTodosServidores/:arquivo/:caminho", function (req, res) {
    CSVscontroller.primeiraConexao(req, res)
});

module.exports = router;