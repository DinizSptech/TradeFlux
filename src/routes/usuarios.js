let express = require("express");
let router = express.Router();

let usuarioController = require("../controllers/usuarioController");

router.post("/cadastrar", function (req, res) {
  usuarioController.cadastrar(req, res);
});

router.post("/autenticar", function (req, res) {
  usuarioController.autenticar(req, res);
});

router.put("/atualizarAcesso/:idUsuario", function (req, res) {
  usuarioController.atualizarAcesso(req, res);
});

router.get("/exibir", function (req, res) {
  usuarioController.exibir(req, res);
});

module.exports = router;
