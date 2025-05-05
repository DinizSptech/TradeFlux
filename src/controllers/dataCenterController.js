var dataCenterModel = require("../models/dataCenterModel");

function cadastrar(req, res) {
  let nome = req.body.nomeServer;
  let logradouro = req.body.logradouroServer;
  let bairro = req.body.bairroServer;
  let cidade = req.body.cidadeServer;
  let uf = req.body.ufServer;
  let numero = req.body.numeroServer;
  let complemento = req.body.complementoServer;
  let cep = req.body.cepServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (logradouro == undefined) {
    res.status(400).send("Seu logradouro está undefined!");
  } else if (bairro == undefined) {
    res.status(400).send("Seu bairro está undefined!");
  } else if (cidade == undefined) {
    res.status(400).send("Sua cidade está undefined!");
  } else if (uf == undefined) {
    res.status(400).send("Seu uf está undefined!");
  } else if (numero == undefined) {
    res.status(400).send("Seu numero está undefined!");
  } else if (cep == undefined) {
    res.status(400).send("Seu CEP está undefined!");
  } else {
    dataCenterModel
      .cadastrar(nome, logradouro, bairro, cidade, uf, numero, cep, complemento)
      .then((resultado) => {
        res.status(200).json(resultado);
        res.status(200).send("Usuario cadastrado com sucesso");
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function exibir(req, res) {
  let nome = req.query.nomeServer;

  dataCenterModel
    .exibir(nome)
    .then((resultado) => {
      if (resultado.length > 0) {
        res.status(200).json(resultado);
      } else {
        res.status(204).send("Nenhum resultado encontrado!");
      }
    })
    .catch((erro) => {
      console.warn(erro);
      console.warn("Houve um erro ao buscar as informações.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

function deletar(req, res) {
  const idDataCenter = req.params.idDataCenter;

  dataCenterModel
    .deletar(idDataCenter)
    .then((resultado) => {
      if (resultado.length == 0) {
        res.status(204).send("Nenhum resultado encontrado!");
        return;
      }
      res.status(200).json(resultado);
    })
    .catch((erro) => {
      console.warn(erro);
      console.warn("Houve um erro ao buscar as informações.", erro.sqlMessage);
      res.status(500).json(erro.sqlMessage);
    });
}

module.exports = {
  cadastrar,
  exibir,
  deletar,
};
