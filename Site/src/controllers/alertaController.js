var alertaModel = require("../models/alertaModel");

function exibirAlertas(req, res) {
  dataCenter = req.params.dataCenter
    alertaModel.exibirAlertas(dataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getTotalAlertas(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getTotalAlertas(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getQtdAlertasComponente(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getQtdAlertasComponente(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getTopServidoresAlertasAtencao(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getTopServidoresAlertasAtencao(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getTopServidoresAlertasCriticos(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getTopServidoresAlertasCriticos(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getAlertaUnsolved(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getAlertaUnsolved(idDataCenter).then((resultado) => {
              res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getAlertasCalendario(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getAlertasCalendario(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getStatusServidores(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getStatusServidores(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}
function getPorcentagemAumentoAlertas(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getPorcentagemAumentoAlertas(idDataCenter).then((resultado) => {
        res.status(200).json(resultado);
    }).catch(function(erro){
        console.log(erro);
        res.status(500).json(erro.sqlMessage);
    })
}

module.exports = {
  exibirAlertas,
  getTotalAlertas,
  getQtdAlertasComponente,
  getPorcentagemAumentoAlertas,
  getTopServidoresAlertasAtencao,
  getTopServidoresAlertasCriticos,
  getAlertaUnsolved,
  getAlertasCalendario,
  getStatusServidores
}