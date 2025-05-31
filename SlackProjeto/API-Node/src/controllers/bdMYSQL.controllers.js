const bdModel = require("../models/bdMYSQL.models")

function cadastrar_servidor(req,res){
    let id_datacenter = req.body.id_datacenter 
    let uuidservidor = req.body.uuidservidor 
    let sistemaoperacional = req.body.sistemaoperacional 
    let discototal = req.body.discototal 
    let ramtotal = req.body.ramtotal 
    let processadorinfo = req.body.processadorinfo 

    console.log('Cadastrando servidor')
        bdModel.insert_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo)
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
  let id = req.params.id
  console.log('Selecionando servidor')
        bdModel.select_servidor(id)
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
  let id = req.params.id
  console.log('Selecionando servidor')
        bdModel.select_parametro(id)
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

    let valor = req.body.valor
    let medida = req.body.medida
    let data = req.body.data
    let criticidade = req.body.criticidade
    let fkparametro = req.body.fkparametro
    let servidor = req.body.servidor
    let componente = req.body.componente
     
    console.log('Inserindo alerta')
        bdModel.insert_alerta(valor, medida, data, criticidade, fkparametro, servidor, componente)
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