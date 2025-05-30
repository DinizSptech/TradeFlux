var admModel = require("../models/admModel");

function responderPromessa(promise, res, descricaoErro) {
    promise
        .then(function (resultado) {
            if (resultado.length > 0) {
                res.status(200).json(resultado);
            } else {
                res.status(204).send("Nenhum resultado encontrado!");
            }
        })
        .catch(function (erro) {
            console.log(erro);
            console.log(`Houve um erro ao buscar ${descricaoErro}: `, erro.sqlMessage);
            res.status(500).json(erro.sqlMessage);
        });
}

// Alertas KPI
function getQtdAlertas24h(req, res) {
    responderPromessa(admModel.getQtdAlertas24h(), res, "getQtdAlertas24h");
}

function getQtdAlertas7d(req, res) {
    responderPromessa(admModel.getQtdAlertas7d(), res, "getQtdAlertas7d");
}

function getQtdAlertas30d(req, res) {
    responderPromessa(admModel.getQtdAlertas30d(), res, "getQtdAlertas30d");
}

// Tempo médio geral
function getTempoMedioGeral24h(req, res) {
    responderPromessa(admModel.getTempoMedioGeral24h(), res, "getTempoMedioGeral24h");
}

function getTempoMedioGeral7d(req, res) {
    responderPromessa(admModel.getTempoMedioGeral7d(), res, "getTempoMedioGeral7d");
}

function getTempoMedioGeral30d(req, res) {
    responderPromessa(admModel.getTempoMedioGeral30d(), res, "getTempoMedioGeral30d");
}

// Top 5 alertas com maior atraso
function get5AlertasMaiorAtraso24h(req, res) {
    responderPromessa(admModel.get5AlertasMaiorAtraso24h(), res, "get5AlertasMaiorAtraso24h");
}

function get5AlertasMaiorAtraso7d(req, res) {
    responderPromessa(admModel.get5AlertasMaiorAtraso7d(), res, "get5AlertasMaiorAtraso7d");
}

function get5AlertasMaiorAtraso30d(req, res) {
    responderPromessa(admModel.get5AlertasMaiorAtraso30d(), res, "get5AlertasMaiorAtraso30d");
}

// Data Centers com maior tempo de resolução
function getDataCenterMediaResolucao24h(req, res) {
    responderPromessa(admModel.getDataCenterMediaResolucao24h(), res, "getDataCenterMediaResolucao24h");
}

function getDataCenterMediaResolucao7d(req, res) {
    responderPromessa(admModel.getDataCenterMediaResolucao7d(), res, "getDataCenterMediaResolucao7d");
}

function getDataCenterMediaResolucao30d(req, res) {
    responderPromessa(admModel.getDataCenterMediaResolucao30d(), res, "getDataCenterMediaResolucao30d");
}

// Data Centers - total de alertas
function getDataCenterTotalAlertas24h(req, res) {
    responderPromessa(admModel.getDataCenterTotalAlertas24h(), res, "getDataCenterTotalAlertas24h");
}

function getDataCenterTotalAlertas7d(req, res) {
    responderPromessa(admModel.getDataCenterTotalAlertas7d(), res, "getDataCenterTotalAlertas7d");
}

function getDataCenterTotalAlertas30d(req, res) {
    responderPromessa(admModel.getDataCenterTotalAlertas30d(), res, "getDataCenterTotalAlertas30d");
}

function getDataCenterTotalAlertasAtrasados24h(req, res) {
    responderPromessa(admModel.getDataCenterTotalAlertasAtrasados24h(), res, "getDataCenterTotalAlertasAtrasados24h");
}

function getDataCenterTotalAlertasAtrasados7d(req, res) {
    responderPromessa(admModel.getDataCenterTotalAlertasAtrasados7d(), res, "getDataCenterTotalAlertasAtrasados7d");
}

function getDataCenterTotalAlertasAtrasados30d(req, res) {
    responderPromessa(admModel.getDataCenterTotalAlertasAtrasados30d(), res, "getDataCenterTotalAlertasAtrasados30d");
}


module.exports = {
    getQtdAlertas24h,
    getQtdAlertas7d,
    getQtdAlertas30d,
    getTempoMedioGeral24h,
    getTempoMedioGeral7d,
    getTempoMedioGeral30d,
    get5AlertasMaiorAtraso24h,
    get5AlertasMaiorAtraso7d,
    get5AlertasMaiorAtraso30d,
    getDataCenterMediaResolucao24h,
    getDataCenterMediaResolucao7d,
    getDataCenterMediaResolucao30d,
    getDataCenterTotalAlertas24h,
    getDataCenterTotalAlertas7d,
    getDataCenterTotalAlertas30d,
    getDataCenterTotalAlertasAtrasados24h,
    getDataCenterTotalAlertasAtrasados7d,
    getDataCenterTotalAlertasAtrasados30d
};