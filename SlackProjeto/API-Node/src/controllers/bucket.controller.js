const bucketModel = require("../models/bucket.models");

function salvarMonitoria(request, response) {
  let cpu = request.body.cpu;
  let ram = request.body.ram;
  let disco = request.body.disco;
  let processos = request.body.processos;
  let download = request.body.download;
  let upload = request.body.upload;

  const variaveis = { cpu, ram, disco, processos, download, upload };
  let erro = false;

  for (const [nome, valor] of Object.entries(variaveis)) {
    if (valor == undefined) {
      res.status(400).send(`A variável '${nome}' está undefined!`);
      erro = true;
      return;
    }
  }

  if (!erro) {
    bucketModel
      .salvandoJSON(request)
      .then(() => {
        res.status(200).send("Componente cadastrado com sucesso");
      })
      .catch(function (erro) {
        console.error("Erro ao cadastrar componente:", erro);
        res.status(500).json(erro.sqlMessage || erro.message);
      });
  }
}

function salvarFoto(request, response) {}

function pegarFoto(request, response) {}

function pegarPix(request, response) {
  try {
    const resultado = bucketModel.pegarPix();
    response.json(resultado);
  } catch (erro) {
    console.error("Erro no controller:", erro);
    response.status(500).json(erro);
  }
}

module.exports = {
  salvarMonitoria,
  salvarFoto,
  pegarFoto,
  pegarPix,
};
