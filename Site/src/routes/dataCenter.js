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

router.post("/pegarServidores", async function (req, res) {
  const lambdaUrl = "https://cmu7qp7lb5exg53gb5umhnhuwy0eikhq.lambda-url.us-east-1.on.aws/";

  try {
    const lambdaResponse = await fetch(lambdaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        qtdDias: req.body.qtdDias,
        dtInicial: req.body.dtInicial,
        datacenter: req.body.datacenter || "1",
      }),
    });

    if (!lambdaResponse.ok) {
      throw new Error(`Lambda request failed with status ${lambdaResponse.status}`);
    }

    const data = await lambdaResponse.json();

    if (Array.isArray(data)) {
      // Formata os dados dos servidores
      const servidoresFormatados = data.map(servidor => ({
        servidor: servidor.servidor,
        media_CPU: servidor.CPU,
        media_RAM: servidor.RAM,
        media_Disco: servidor.Disco
      }));

      // Calcula média total para o gráfico
      const mediaTotal = {
        CPU: data.reduce((sum, s) => sum + s.CPU, 0) / data.length,
        RAM: data.reduce((sum, s) => sum + s.RAM, 0) / data.length,
        Disco: data.reduce((sum, s) => sum + s.Disco, 0) / data.length
      };

      // Envia resposta de sucesso com os dados e a média
      res.status(200).json({
        success: true,
        data: servidoresFormatados,
        mediaTotal: mediaTotal
      });
    } else {
      throw new Error("Resposta da Lambda não é um array");
    }
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    res.status(500).json({
      success: false,
      erro: "Erro ao buscar dados da Lambda",
      details: error.message
    });
  }
});

module.exports = router;