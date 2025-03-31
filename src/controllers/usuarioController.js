let usuarioModel = require("../models/usuarioModel");

function listarUsuario(req, res) {
  usuarioModel
    .listar()
    .then(function (resultado) {
      res.status(200).json(resultado);
    })
    .catch(function (erro) {
      res.status(500).json(erro.sqlMessage);
    });
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  let nome = req.body.nomeServer;
  let senha = req.body.senhaServer;
  let email = req.body.emailServer;
  let cargo = req.body.cargoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else {
    usuarioModel
      .cadastrar(nome, senha, email, cargo)
      .then((resultado) => {
        res.status(200).json(resultado);
        res.status(200).send("Usuario cadastrado com sucesso");
      })
      .catch(function (erro) {
        res.status(500).json(erro.sqlMessage);
      });
  }
}

module.exports = {
  listarUsuario,
  cadastrar,
};
