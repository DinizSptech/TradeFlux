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
function getTopServidoresAlertas(req, res) {
  idDataCenter = req.params.dataCenter
    alertaModel.getTopServidoresAlertas(idDataCenter).then((resultado) => {
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
  getTopServidoresAlertas
};