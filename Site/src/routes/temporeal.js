var express = require("express");
var router = express.Router();

let dadosTempoReal = [];

router.post("/monitoria", (req, res) => {
  console.log("Dados recebidos!")
  const servidorRecebido = req.body.servidor;
  const novoDado = req.body.dados;

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
  console.log(servidorExistente.dados[servidorExistente.dados.length - 1])
  return res.status(200).send("Buffer modificado, nova captura enviada.");
});

router.get("/monitoria", (req, res) => {
  res.status(200).json(dadosTempoReal);
});

module.exports = router;
