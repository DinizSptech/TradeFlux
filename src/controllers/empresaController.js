var empresaModel = require("../models/empresaModel");

function buscarPorCnpj(req, res) {
  var cnpj = req.query.cnpj;

  empresaModel.buscarPorCnpj(cnpj).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function listar(req, res) {
  empresaModel.listar().then((resultado) => {
    res.status(200).json(resultado);
  });
}

function buscarPorId(req, res) {
  var id = req.params.id;

  empresaModel.buscarPorId(id).then((resultado) => {
    res.status(200).json(resultado);
  });
}

function cadastrar(req, res) {
  var cnpj = req.body.cnpj;
  var razaoSocial = req.body.razaoSocial;
  var dtCadastro = req.body.dtCadastro;

    if (cnpj == undefined) {
        res.status(400).send("Seu cnpj está undefined!");
    } else if (razaoSocial == undefined) {
        res.status(400).send("Sua razaoSocial está undefined!");
    }else if (dtCadastro == undefined) {
      res.status(400).send("Seu dtCadastro está undefined!");
    }else{
        empresaModel.cadastrar(cnpj, razaoSocial, dtCadastro).then((resultado) => {
                res.status(200).json(resultado);
                res.status(200).send("Empresa cadastrada com sucesso");
              }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })        
    }
}

module.exports = {
  buscarPorCnpj,
  buscarPorId,
  cadastrar,
  listar,
};
