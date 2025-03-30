var usuarioModel = require("../models/usuarioModel");

function listar(req, res) {
    usuarioModel.listar().then(function(resultado){
        res.status(200).json(resultado);
    }).catch(function(erro){
        res.status(500).json(erro.sqlMessage);
    })
}

function cadastrar(req, res) { //nome, cpf, senha, email, perfil, ativo, fkUnidade
    var nome = req.body.nome;
    var cpf = req.body.cpf;
    var senha = req.body.senha;
    var email = req.body.email;
    var perfil = req.body.perfil;
    var ativo = req.body.ativo;
    var fkUnidade = req.body.fkUnidade

    if (nome == undefined) {
        res.status(400).send("Seu nome está undefined!");
    }else if (cpf == undefined) {
        res.status(400).send("Seu cpf está undefined!");
    }else if (senha == undefined) {
        res.status(400).send("Sua senha está undefined!");
    }else if (email == undefined) {
        res.status(400).send("Seu email está undefined!");
    }else if (perfil == undefined) {
        res.status(400).send("Seu perfil está undefined!");
    }else if (ativo == undefined) {
        res.status(400).send("Seu ativo está undefined!");
    }else if (fkUnidade == undefined) {
        res.status(400).send("Sua fkUnidade está undefined!");
    }else{
        usuarioModel.cadastrar(nome, cpf, senha, email, perfil, ativo, fkUnidade).then((resultado) => {
                res.status(200).json(resultado);
                res.status(200).send("Usuario cadastrado com sucesso");
              }).catch(function(erro){
                res.status(500).json(erro.sqlMessage);
            })        
    }
    
}

module.exports = {
    listar,
    cadastrar
}