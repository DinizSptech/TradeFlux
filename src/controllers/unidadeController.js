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
    var cep = req.body.cep;
    var estado = req.body.estado;
    var cidade = req.body.cidade;
    var bairro = req.body.bairro;
    var logradouro = req.body.logradouro;
    var numero = req.body.numero;
    var complemento = req.body.complemento;
    var fkCliente = 1;

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    } else if (cep == undefined) {
        res.status(400).send("Seu cep está undefined!");
    }   else if (estado == undefined) {
        res.status(400).send("Seu estado está undefined!");
    } else if (cidade == undefined) {
        res.status(400).send("Sua cidade está undefined!");
    } else if (bairro == undefined) {
        res.status(400).send("Seu bairro está undefined!");
    } else if (logradouro == undefined) {
        res.status(400).send("Seu logradouro está undefined!");
    } else if (numero == undefined) {
        res.status(400).send("Seu numero está undefined!");
    } else if (complemento == undefined) {
        res.status(400).send("Seu complemento está undefined!");
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