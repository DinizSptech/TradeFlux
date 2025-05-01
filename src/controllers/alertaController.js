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

module.exports = {
  exibirAlertas
};
