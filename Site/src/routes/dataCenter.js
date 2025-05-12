let express = require("express");
let router = express.Router();

let datacenterController = require("../controllers/dataCenterController");

router.post("/cadastrar", function (req, res) {
  datacenterController.cadastrar(req, res);
});

router.get("/exibir", function (req, res) {
  datacenterController.exibir(req, res);
});

router.delete("/deletar/:idDataCenter", function (req, res) {
  datacenterController.deletar(req, res);
});

module.exports = router;