var unidadeModel = require("../models/unidadeModel");

function listar(req, res) {
    unidadeModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) { 
    var nome = req.body.nome;
    var estado = req.body.estado;
    var cidade = req.body.cidade;
    var bairro = req.body.bairro;
    var contato = req.body.contato;
    var fkEmpresa = req.body.fkEmpresa

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    }else if (cidade == undefined) {
        res.status(400).send("Seu cidade está undefined!");
    }else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    }else if (contato == undefined) {
        res.status(400).send("Seu contato está undefined!");
    }else if (fkEmpresa == undefined) {
        res.status(400).send("sua fkEmpresa está undefined!");
    }else{
        unidadeModel.cadastrar(nome, estado, cidade, bairro, contato, fkEmpresa).then((resultado) => {
                res.status(200).json(resultado);
                res.status(200).send("Unidade criada com sucesso");
              }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })        
    }
    
}

module.exports = {
    listar,
    cadastrar
}