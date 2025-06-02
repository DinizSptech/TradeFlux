var express = require("express");
var router = express.Router();

let dadosTempoReal = [];

router.post("/monitoria", (req, res) => {
  const servidorRecebido = req.body.servidor;
  const novoDado = req.body.dados[0];

  let servidorExistente = dadosTempoReal.find(dadoServer => dadoServer.servidor == servidorRecebido);

  if (!servidorExistente) {
    dadosTempoReal.push({
      servidor: servidorRecebido,
      dados: [novoDado]
    });
    return res.status(200).send("Novo servidor adicionado na monitoria.");
  }

  if (servidorExistente.dados.length >= 10) {
    servidorExistente.dados.shift();
  }
  servidorExistente.dados.push(novoDado);
  return res.status(200).send("Buffer modificado, nova captura enviada.");
});

router.get("/monitoria", (req, res) => {
  res.status(200).json(dadosTempoReal);
});

module.exports = router;
