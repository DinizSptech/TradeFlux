const e = require("express");
let usuarioModel = require("../models/usuarioModel");

function autenticar(req, res) {
  var email = req.body.emailServer;
  var senha = req.body.senhaServer;

  if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está indefinida!");
  } else {
    usuarioModel.autenticar(email, senha)
      .then(function (resultadoAutenticar) {
        console.log(`\nResultados encontrados: ${resultadoAutenticar.length}`);
        console.log(`Resultados: ${JSON.stringify(resultadoAutenticar)}`); // transforma JSON em String

        if (resultadoAutenticar.length == 1) {
          console.log(resultadoAutenticar);
          res.json({
            id: resultadoAutenticar[0].idUsuario,
            nome: resultadoAutenticar[0].nome,
            email: resultadoAutenticar[0].email,
            senha: resultadoAutenticar[0].senha,
            cargo: resultadoAutenticar[0].cargo
          });
        } else if (resultadoAutenticar.length == 0) {
          res.status(403).send("Email e/ou senha inválido(s)");
        } else {
          res.status(403).send("Mais de um usuário com o mesmo login e senha!");
        }
      })
      .catch(function (erro) {
        console.log(erro);
        console.log(
          "\nHouve um erro ao realizar o login! Erro: ",
          erro.sqlMessage
        );
        res.status(500).json(erro.sqlMessage);
      });
  }
}

function cadastrar(req, res) {
  // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
  let nome = req.body.nomeServer;
  let senha = req.body.senhaServer;
  let email = req.body.emailServer;
  let cargo = req.body.cargoServer;
  let empresa_cliente = req.body.empresaServer;
  let ativo = req.body.ativoServer;

  if (nome == undefined) {
    res.status(400).send("Seu nome está undefined!");
  } else if (senha == undefined) {
    res.status(400).send("Sua senha está undefined!");
  } else if (email == undefined) {
    res.status(400).send("Seu email está undefined!");
  } else if (cargo == undefined) {
    res.status(400).send("Seu cargo está undefined!");
  }  else if (ativo == undefined) {
    res.status(400).send("Seu ativo está undefined!");
  }  else if (empresa_cliente == undefined) {
    res.status(400).send("Sua empresa está undefined!");
  }
  else {
    usuarioModel
      .cadastrar(nome, senha, email, cargo, ativo, empresa_cliente)
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
  autenticar,
  cadastrar,
};
