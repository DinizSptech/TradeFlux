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
  // Link da Lambda feita na AWS:
  const lambdaUrl = "https://orxjfwgfo4b4cl5gavd7ne5p5m0gtuxx.lambda-url.us-east-1.on.aws/";

  try {
    // Chama a lambda (Passa o datacenter 1 como parâmetro ou o que tiver dentro do corpo)
    const lambdaResponse = await fetch(lambdaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datacenter: req.body.datacenter || "1",
      }),
    });

    if (!lambdaResponse.ok) {
      throw new Error(`Lambda deu erro com o seguinte status ${lambdaResponse.status}`);
      // Vê se deu algum erro e "lança" pro catch
    }

    const data = await lambdaResponse.json();
    console.log(data)
    // Console log nos dados para ver como estão e se estão chegando

    res.status(200).send({
      deuCerto: true,
      dados: data
    });
    
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    res.status(500).json({
      deuCerto: false,
      erro: "Erro ao buscar dados da Lambda",
      details: error.message
    });
  }
});

router.post("/pegarProcessos", async function (req, res) {
  // Link da Lambda feita na AWS:
  const lambdaUrl = "https://dc6djea6zumywibfwj4z7wlale0sbvhi.lambda-url.us-east-1.on.aws/";
  console.log('Entrou na rota')

  try {
    // Chama a lambda (Passa o datacenter 1 como parâmetro ou o que tiver dentro do corpo)
    const lambdaResponse = await fetch(lambdaUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        datacenter: req.body.datacenter || "1",
      }),
    });

    if (!lambdaResponse.ok) {
      throw new Error(`Lambda deu erro com o seguinte status ${lambdaResponse.status}`);
      // Vê se deu algum erro e "lança" pro catch
    }

    const data = await lambdaResponse.json();
    console.log(data)
    // Console log nos dados para ver como estão e se estão chegando

    res.status(200).send({
      deuCerto: true,
      dados: data
    });
    
  } catch (error) {
    console.error("Erro ao buscar dados:", error.message);
    res.status(500).json({
      deuCerto: false,
      erro: "Erro ao buscar dados da Lambda",
      details: error.message
    });
  }
});

module.exports = router;