var componenteModel = require("../models/componenteModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    let componente = req.body.componenteServer;
    let limiar = req.body.limiarServer;
    let servidor = req.body.servidorServer;
  

     if (componente == undefined) {
      res.status(400).send("Seu componente está undefined!");
    } else if (limiar == undefined) {
      res.status(400).send("Seu limiar de alerta está undefined!");
    } else if (servidor == undefined) {
      res.status(400).send("Seu servidor está undefined!");
    }

    else {
      componenteModel
        .cadastrar(componente, limiar, servidor)
        .then(() => {
            res.status(200).send("Componente cadastrado com sucesso");
          })
        .catch(function (erro) {
            console.error("Erro ao cadastrar componente:", erro);
            res.status(500).json(erro.sqlMessage || erro.message);
          });
          
    }
  }

function listarServidores(req, res) {
    componenteModel.listarServidores().then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}


function listarComponentes(req, res) {
  servidor = req.params.servidor
    componenteModel.listarComponentes(servidor).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}

function exibirComponentes(req, res) {
  dataCenter = req.params.dataCenter
    componenteModel.exibirComponentes(dataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}


function excluir(req, res) {
    componenteSelecionadoParaExcluir = req.params.componenteSelecionadoParaExcluir
      componenteModel.excluir(componenteSelecionadoParaExcluir).then((resultado) => {
          res.status(200).json(resultado);
      }).catch(function(erro){
          console.log(erro);
          res.status(500).json(erro.sqlMessage);
      })
  }

  function editarComponente(req, res) {
    var parametroComponente = req.body.parametroComponenteServer;
    var valor = req.body.valorServer;
        componenteModel.editarComponente(parametroComponente, valor).then((resultado) => {
            res.status(200).json(resultado);
        }).catch(function(erro){
            console.log(erro);
            res.status(500).json(erro.sqlMessage);
        })
    
}

module.exports = {
  cadastrar,
    listarServidores,
    listarComponentes,
    exibirComponentes,
    excluir,
    editarComponente
};
