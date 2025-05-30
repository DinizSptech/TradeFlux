let database = require("../database/config");

// Função auxiliar para logs
function logFuncao(nomeFuncao) {
  console.log(`ACESSEI O COMPONENTE MODEL - ${nomeFuncao}:`);
  console.log(">> Verifique as credenciais do BD se houver erro de conexão");
}

// 1. Alertas KPI
function getQtdAlertas24h() {
  logFuncao("getQtdAlertas24h");
  let instrucaoSql = `SELECT * FROM vw_qtd_alertas_24h;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getQtdAlertas7d() {
  logFuncao("getQtdAlertas7d");
  let instrucaoSql = `SELECT * FROM vw_qtd_alertas_7d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getQtdAlertas30d() {
  logFuncao("getQtdAlertas30d");
  let instrucaoSql = `SELECT * FROM vw_qtd_alertas_30d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// 2. Tempo médio geral
function getTempoMedioGeral24h() {
  logFuncao("getTempoMedioGeral24h");
  let instrucaoSql = `SELECT * FROM vw_tempo_medio_24h;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getTempoMedioGeral7d() {
  logFuncao("getTempoMedioGeral7d");
  let instrucaoSql = `SELECT * FROM vw_tempo_medio_7d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getTempoMedioGeral30d() {
  logFuncao("getTempoMedioGeral30d");
  let instrucaoSql = `SELECT * FROM vw_tempo_medio_30d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// 3. Top 5 alertas com maior atraso
function get5AlertasMaiorAtraso24h() {
  logFuncao("get5AlertasMaiorAtraso24h");
  let instrucaoSql = `SELECT * FROM vw_top5_alertas_atraso_24h;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function get5AlertasMaiorAtraso7d() {
  logFuncao("get5AlertasMaiorAtraso7d");
  let instrucaoSql = `SELECT * FROM vw_top5_alertas_atraso_7d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function get5AlertasMaiorAtraso30d() {
  logFuncao("get5AlertasMaiorAtraso30d");
  let instrucaoSql = `SELECT * FROM vw_top5_alertas_atraso_30d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// 4. Data Centers com maior tempo de resolução
function getDataCenterMediaResolucao24h() {
  logFuncao("getDataCenterMediaResolucao24h");
  let instrucaoSql = `SELECT * FROM vw_datacenter_media_resolucao_24h;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterMediaResolucao7d() {
  logFuncao("getDataCenterMediaResolucao7d");
  let instrucaoSql = `SELECT * FROM vw_datacenter_media_resolucao_7d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterMediaResolucao30d() {
  logFuncao("getDataCenterMediaResolucao30d");
  let instrucaoSql = `SELECT * FROM vw_datacenter_media_resolucao_30d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// 5. Data Centers total de alertas
function getDataCenterTotalAlertas24h() {
  logFuncao("getDataCenterTotalAlertas24h");
  let instrucaoSql = `SELECT * FROM vw_datacenter_total_alertas_24h;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertas7d() {
  logFuncao("getDataCenterTotalAlertas7d");
  let instrucaoSql = `SELECT * FROM vw_datacenter_total_alertas_7d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertas30d() {
  logFuncao("getDataCenterTotalAlertas30d");
  let instrucaoSql = `SELECT * FROM vw_datacenter_total_alertas_30d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// 6. Data Centers alertas atrasados
function getDataCenterTotalAlertasAtrasados24h() {
  logFuncao("getDataCenterTotalAlertasAtrasados24h");
  let instrucaoSql = `SELECT * FROM vw_datacenter_alertas_atrasados_24h;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertasAtrasados7d() {
  logFuncao("getDataCenterTotalAlertasAtrasados7d");
  let instrucaoSql = `SELECT * FROM vw_datacenter_alertas_atrasados_7d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertasAtrasados30d() {
  logFuncao("getDataCenterTotalAlertasAtrasados30d");
  let instrucaoSql = `SELECT * FROM vw_datacenter_alertas_atrasados_30d;`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
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