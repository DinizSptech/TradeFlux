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
  let nome = req.body.nome;
  let senha = req.body.senha;
  let email = req.body.email;
  let cargo = req.body.cargo;
  let ativo = req.body.ativo;
  let fk_cliente = req.body.fk_cliente;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  } else if (ativo == undefined) {
    res.status(400).send("Seu ativo está undefined!");
  } else if (fk_cliente == undefined) {
    res.status(400).send("Sua fk_cliente está undefined!");
  } else {
    usuarioModel
      .cadastrar(nome, senha, email, cargo, ativo, fk_cliente)
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
