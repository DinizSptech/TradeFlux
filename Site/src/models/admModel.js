let database = require("../database/config");

// Função auxiliar para logs
function logFuncao(nomeFuncao) {
  console.log(`ACESSEI O COMPONENTE MODEL - ${nomeFuncao}:`);
  console.log(">> Verifique as credenciais do BD se houver erro de conexão");
}

// Alertas KPI
function getQtdAlertas24h() {
  logFuncao("getQtdAlertas24h");
  
  let instrucaoSql = `
    SELECT COUNT(*) as qtd_alertas 
    FROM alerta
    WHERE TIMESTAMPDIFF(MINUTE, data_gerado, data_resolvido) > 5
      AND data_gerado >= NOW() - INTERVAL 24 HOUR;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getQtdAlertas7d() {
  logFuncao("getQtdAlertas7d");
  
  let instrucaoSql = `
    SELECT COUNT(*) as qtd_alertas 
    FROM alerta
    WHERE TIMESTAMPDIFF(MINUTE, data_gerado, data_resolvido) > 5
      AND data_gerado >= NOW() - INTERVAL 7 DAY;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getQtdAlertas30d() {
  logFuncao("getQtdAlertas30d");
  
  let instrucaoSql = `
    SELECT COUNT(*) as qtd_alertas 
    FROM alerta
    WHERE TIMESTAMPDIFF(MINUTE, data_gerado, data_resolvido) > 5
      AND data_gerado >= NOW() - INTERVAL 30 DAY;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Tempo Médio Geral - CORRIGIDO os aliases
function getTempoMedioGeral24h() {
  logFuncao("getTempoMedioGeral24h");
  
  let instrucaoSql = `
    SELECT 
      SEC_TO_TIME(FLOOR(AVG(TIMESTAMPDIFF(SECOND, data_gerado, data_resolvido)))) 
      AS tempo_medio_24h
    FROM alerta
    WHERE data_resolvido IS NOT NULL
      AND data_gerado >= NOW() - INTERVAL 24 HOUR;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getTempoMedioGeral7d() {
  logFuncao("getTempoMedioGeral7d");
  
  let instrucaoSql = `
    SELECT 
      SEC_TO_TIME(FLOOR(AVG(TIMESTAMPDIFF(SECOND, data_gerado, data_resolvido)))) 
      AS tempo_medio_7d
    FROM alerta
    WHERE data_resolvido IS NOT NULL
      AND data_gerado >= NOW() - INTERVAL 7 DAY;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getTempoMedioGeral30d() {
  logFuncao("getTempoMedioGeral30d");
  
  let instrucaoSql = `
    SELECT 
      SEC_TO_TIME(FLOOR(AVG(TIMESTAMPDIFF(SECOND, data_gerado, data_resolvido)))) 
      AS tempo_medio_30d
    FROM alerta
    WHERE data_resolvido IS NOT NULL
      AND data_gerado >= NOW() - INTERVAL 30 DAY;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// 5 Alertas com Maior Atraso - MELHORADO com LIMIT
function get5AlertasMaiorAtraso24h() {
  logFuncao("get5AlertasMaiorAtraso24h");
  
  let instrucaoSql = `
    SELECT * FROM vw_alertas_simples
    WHERE STR_TO_DATE(\`data-hora\`, '%d/%m/%y %H:%i:%s') >= NOW() - INTERVAL 24 HOUR
    ORDER BY \`tempo de resolução\` DESC
    LIMIT 5;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function get5AlertasMaiorAtraso7d() {
  logFuncao("get5AlertasMaiorAtraso7d");
  
  let instrucaoSql = `
    SELECT * FROM vw_alertas_simples
    WHERE STR_TO_DATE(\`data-hora\`, '%d/%m/%y %H:%i:%s') >= NOW() - INTERVAL 7 DAY
    ORDER BY \`tempo de resolução\` DESC
    LIMIT 5;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function get5AlertasMaiorAtraso30d() {
  logFuncao("get5AlertasMaiorAtraso30d");
  
  let instrucaoSql = `
    SELECT * FROM vw_alertas_simples
    WHERE STR_TO_DATE(\`data-hora\`, '%d/%m/%y %H:%i:%s') >= NOW() - INTERVAL 30 DAY
    ORDER BY \`tempo de resolução\` DESC
    LIMIT 5;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Data Centers com maior tempo de resolução
function getDataCenterMediaResolucao24h() {
  logFuncao("getDataCenterMediaResolucao24h");
  
  let instrucaoSql = `
    SELECT * FROM vw_resolucao_medio_datacenter
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 24 HOUR
      GROUP BY dc.nome
    )
    ORDER BY tempo_medio_resolucao DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterMediaResolucao7d() {
  logFuncao("getDataCenterMediaResolucao7d");
  
  let instrucaoSql = `
    SELECT * FROM vw_resolucao_medio_datacenter
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 7 DAY
      GROUP BY dc.nome
    )
    ORDER BY tempo_medio_resolucao DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterMediaResolucao30d() {
  logFuncao("getDataCenterMediaResolucao30d");
  
  let instrucaoSql = `
    SELECT * FROM vw_resolucao_medio_datacenter
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 30 DAY
      GROUP BY dc.nome
    )
    ORDER BY tempo_medio_resolucao DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Data Centers - total de alertas
function getDataCenterTotalAlertas24h() {
  logFuncao("getDataCenterTotalAlertas24h");
  
  let instrucaoSql = `
    SELECT * FROM vw_total_alertas_datacenter
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 24 HOUR
      GROUP BY dc.nome
    )
    ORDER BY total_alertas DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertas7d() {
  logFuncao("getDataCenterTotalAlertas7d");
  
  let instrucaoSql = `
    SELECT * FROM vw_total_alertas_datacenter
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 7 DAY
      GROUP BY dc.nome
    )
    ORDER BY total_alertas DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertas30d() {
  logFuncao("getDataCenterTotalAlertas30d");
  
  let instrucaoSql = `
    SELECT * FROM vw_total_alertas_datacenter
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 30 DAY
      GROUP BY dc.nome
    )
    ORDER BY total_alertas DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Data Centers - total de alertas atrasados
function getDataCenterTotalAlertasAtrasados24h() {
  logFuncao("getDataCenterTotalAlertasAtrasados24h");
  
  let instrucaoSql = `
    SELECT * FROM vw_alertas_acima_5min
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 24 HOUR
      GROUP BY dc.nome
    )
    ORDER BY total_alertas_acima_5min DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertasAtrasados7d() {
  logFuncao("getDataCenterTotalAlertasAtrasados7d");
  
  let instrucaoSql = `
    SELECT * FROM vw_alertas_acima_5min
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 7 DAY
      GROUP BY dc.nome
    )
    ORDER BY total_alertas_acima_5min DESC;
  `;

  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getDataCenterTotalAlertasAtrasados30d() {
  logFuncao("getDataCenterTotalAlertasAtrasados30d");
  
  let instrucaoSql = `
    SELECT * FROM vw_alertas_acima_5min
    WHERE data_center IN (
      SELECT dc.nome
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.medida = '%' AND a.data_gerado >= NOW() - INTERVAL 30 DAY
      GROUP BY dc.nome
    )
    ORDER BY total_alertas_acima_5min DESC;
  `;

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