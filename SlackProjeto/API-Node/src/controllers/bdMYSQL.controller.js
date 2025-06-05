const bdModel = require("../models/bdMYSQL.models");

function cadastrar_servidor(req, res) {
    let id_datacenter = req.body.id_datacenter;
    let uuidservidor = req.body.uuidservidor;
    let sistemaoperacional = req.body.sistemaoperacional;
    let discototal = req.body.discototal;
    let ramtotal = req.body.ramtotal;
    let processadorinfo = req.body.processadorinfo;

    console.log('Cadastrando servidor');
    bdModel.insert_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo)
        .then(function (resultado) {
            // Corrigido: enviar apenas uma resposta
            res.status(200).json({
                success: true,
                message: "Cadastro bem sucedido!",
                data: resultado
            });
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao cadastrar o servidor! Erro: ", erro.sqlMessage);
            res.status(500).json({
                success: false,
                error: erro.sqlMessage || erro.message
            });
        });
}

// Versão corrigida da função buscar_servidor
function buscar_servidor(req, res) {
    let uuid = req.params.uuid;
    console.log('Selecionando servidor com UUID:', uuid);
    bdModel.select_servidor(uuid)
        .then(function (resultadoSelect) {
            console.log('Resultado da busca:', resultadoSelect);
            
            // Correção: usar o nome correto do campo conforme o banco
            const idservidor = resultadoSelect.length > 0 ? resultadoSelect[0].idservidor : null;
            
            res.status(200).json({
                success: true,
                idservidor: idservidor,
                data: resultadoSelect
            });
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o servidor! Erro: ", erro.sqlMessage);
            res.status(500).json({
                success: false,
                error: erro.sqlMessage || erro.message
            });
        });
}

function cadastrar_parametros(req, res) {
    let id_servidor = req.body.id_servidor;
    let limiar_atencao = req.body.limiar_atencao;
    let limiar_critico = req.body.limiar_critico;

    console.log('Cadastrando parametros');
    bdModel.insert_parametros(id_servidor, limiar_atencao, limiar_critico)
        .then(function (resultado) {
            res.status(200).json({
                success: true,
                message: "Cadastro de parâmetros bem sucedido!",
                data: resultado
            });
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao cadastrar os parâmetros! Erro: ", erro.sqlMessage);
            res.status(500).json({
                success: false,
                error: erro.sqlMessage || erro.message
            });
        });
}

function buscar_parametro(req, res) {
    let id = req.params.id;
    console.log('Selecionando parâmetros');
    bdModel.select_parametro(id)
        .then(function (resultadoSelect) {
            // Corrigido: enviar apenas uma resposta JSON
            res.status(200).json({
                success: true,
                idservidor: id,
                parametros: resultadoSelect
            });
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao buscar o parâmetro! Erro: ", erro.sqlMessage);
            res.status(500).json({
                success: false,
                error: erro.sqlMessage || erro.message
            });
        });
}

function inserir_alerta(req, res) {
    let valor = req.body.valor;
    let medida = req.body.medida;
    let data = req.body.data;
    let criticidade = req.body.criticidade;
    let fkparametro = req.body.fkparametro;
    let servidor = req.body.servidor;
    let componente = req.body.componente;
     
    console.log('Inserindo alerta');
    bdModel.insert_alerta(valor, medida, data, criticidade, fkparametro, servidor, componente)
        .then(function (resultado) {
            res.status(200).json({
                success: true,
                message: "Sucesso ao inserir alerta!",
                data: resultado
            });
        }).catch(function (erro) {
            console.log(erro);
            console.log("\nHouve um erro ao inserir o alerta! Erro: ", erro.sqlMessage);
            res.status(500).json({
                success: false,
                error: erro.sqlMessage || erro.message
            });
        });
}

module.exports = {
    cadastrar_servidor,
    inserir_alerta,
    cadastrar_parametros,
    buscar_parametro,
    buscar_servidor
};