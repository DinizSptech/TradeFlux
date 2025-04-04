var unidadeModel = require("../models/unidadeModel");

function listar(req, res) {
    unidadeModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) { 
    var nome = req.body.nomeServer;
    var cep = req.body.cepServer;
    var estado = req.body.estadoServer;
    var cidade = req.body.cidadeServer;
    var bairro = req.body.bairroServer;
    var logradouro = req.body.logradouroServer;
    var numero = req.body.numeroServer;
    var complemento = req.body.complementoServer;
    var fkCliente = 1;

    if (nome == undefined) {
        res.status(401).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(401).send("Seu cep está undefined!");
    }   else if (estado == undefined) {
        res.status(401).send("Seu estado está undefined!");
    } else if (cidade == undefined) {
        res.status(401).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(401).send("Seu bairro está undefined!");
    } else if (logradouro == undefined) {
        res.status(401).send("Seu logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(401).send("Seu numero está undefined!");
    } else if (complemento == undefined) {
        res.status(401).send("Seu complemento está undefined!");
    }else{
        unidadeModel.cadastrar(nome, cep, estado, cidade, bairro, logradouro, numero, complemento, fkCliente).then(function(resultado){
            res.status(200).json(resultado);
        }).catch(function(erro){
            res.status(500).json(erro.sqlMessage);
        })      
    }
    
}

module.exports = {
    listar,
    cadastrar
}