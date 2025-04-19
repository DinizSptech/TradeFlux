var componenteModel = require("../models/ComponenteModel");

function cadastrar(req, res) {
    // Crie uma variável que vá recuperar os valores do arquivo cadastro.html
    let nome = req.body.nomeServer;
    let medida = req.body.medidaServer;
    let limiar = req.body.limiarServer;
    let servidor = req.body.servidorServer;
  
    if (nome == undefined) {
      res.status(400).send("Seu nome está undefined!");
    } else if (medida == undefined) {
      res.status(400).send("Sua medida está undefined!");
    } else if (limiar == undefined) {
      res.status(400).send("Seu limiar de alerta está undefined!");
    } else if (servidor == undefined) {
      res.status(400).send("Seu servidor está undefined!");
    }

    else {
      componenteModel
        .cadastrar(nome, medida, limiar, servidor)
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

module.exports = {
  cadastrar,
    listarServidores,
};
