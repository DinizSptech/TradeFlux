const bdModel = require("../models/bdMYSQL.models")

function cadastrar_servidor(req,res){
    console.log('Cadastrando servidor')
        bdModel.insert_servidor(req,res)
            .then( function (resultado) {
                res.json(resultado);
                res.status(200).send("Cadastro bem sucedido!")
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao cadastrar o servidor! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function buscar_servidor(req,res){
  console.log('Selecionando servidor')
        bdModel.select_servidor(req,res)
            .then( function (resultadoSelect) {
                res.json({
                  lista: resultadoSelect
                });
                res.status(200).send("Busca bem sucedida!\n" + resultadoSelect)
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao buscar o servidor ! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function buscar_parametro(req,res){
  console.log('Selecionando servidor')
        bdModel.select_parametro(req,res)
            .then( function (resultadoSelect) {
                res.json({
                  lista: resultadoSelect
                });
                res.status(200).send("Busca bem sucedida!\n" + resultadoSelect)
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao realizar o buscar o parametro! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
            );
}

function inserir_alerta(req,res){
    console.log('Inserindo alerta')
        bdModel.insert_alerta(req,res)
            .then( function (resultado) {
                res.json(resultado);
                res.status(200).send("Sucesso em inserir alerta!\n")
            }).catch(
                function (erro) {
                    console.log(erro);
                    console.log("\nHouve um erro ao inserir o alerta! Erro: ", erro.sqlMessage);
                    res.status(500).json(erro.sqlMessage);
                }
              )
}

module.exports = {
    cadastrar_servidor,
    inserir_alerta,
    buscar_parametro,
    buscar_servidor
};