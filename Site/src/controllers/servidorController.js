var servidorModel = require("../models/servidorModel");

function cadastrar(req, res) {
  var dataCenter = req.body.dataCenterServer;
  console.log("Cadastrando servidor: ", dataCenter);

  if (dataCenter == undefined) {
    res.status(400).send("Seu data center escolhido está undefined!");
  } else {
    servidorModel
      .cadastrar(dataCenter)
      .then((resultado) => {
        res.status(200).json(resultado);
      })
      .catch(function (erro) {
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function listarDataCenters(req, res) {
  servidorModel
    .listarDataCenters()
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function exibirServidores(req, res) {
  dataCenter = req.params.dataCenter;
  servidorModel
    .exibirServidores(dataCenter)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function editarServidor(req, res) {
  var servidor = req.body.servidorServer;
  var componente = req.body.componenteServer;
  var valor = req.body.valorServer;
  servidorModel
    .editarServidor(servidor, componente, valor)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

function excluir(req, res) {
  servidorSelecionadoParaExcluir = req.params.servidorSelecionadoParaExcluir;
  servidorModel
    .excluir(servidorSelecionadoParaExcluir)
    .then((resultado) => {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      console.log(erro);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  listarDataCenters,
  exibirServidores,
  editarServidor,
  excluir,
};
