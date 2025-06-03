let database = require("../database/config");

function exibirAlertas(dataCenter) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirAlertas():",
  );

  let instrucaoSql = `
      select idAlerta, valor, a.medida, data, criticidade, nomeComponente, idServidor, fkDataCenter
      from Alerta as a
      join Parametro_Servidor as ps
      on a.fkParametro = ps.idParametros_Servidor
      join Servidor_Cliente as sc
      on ps.fkServidor = sc.idServidor
      join Componente as c
      on ps.fkComponente = c.idComponente
      where sc.fkDataCenter = ${dataCenter}
      order by data desc;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getTotalAlertas(idDataCenter){
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirAlertas():",
  );
  
  let instrucaoSql = `
      SELECT 
      SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS alertas_atencao,
      SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS alertas_criticos
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE dc.iddata_center = ${idDataCenter}
      AND a.criticidade IN (1, 3)
      AND a.data_gerado >= NOW() - INTERVAL 30 DAY;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function getQtdAlertasComponente(idDataCenter){
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirAlertas():",
  );
  
  let instrucaoSql = `
      SELECT 
      c.nomecomponente AS componente,
      SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS alertas_atencao,
      SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS alertas_criticos,
      COUNT(*) AS total_alertas
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN componente c ON p.fk_componente = c.idcomponente
      LEFT JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      LEFT JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE dc.iddata_center = ${idDataCenter}
      AND c.nomecomponente IN ('cpu_percentual', 'ram_percentual', 'disco_percentual')
      AND a.criticidade IN (1, 3)
      AND a.data_gerado >= NOW() - INTERVAL 30 DAY
      GROUP BY c.nomecomponente
      ORDER BY total_alertas DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function getTopServidoresAlertas(idDataCenter){
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirAlertas():",
  );
  
  let instrucaoSql = `
      SELECT 
      CONCAT('Servidor ', s.idservidor) AS nome_servidor,
      COUNT(*) AS qtd_alertas_atencao
      FROM alerta a
      JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
      JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
      JOIN data_center dc ON s.fk_data_center = dc.iddata_center
      WHERE a.criticidade = 1
      AND a.data_gerado >= NOW() - INTERVAL 30 DAY
      AND dc.iddata_center = 1
      GROUP BY s.idservidor
      ORDER BY qtd_alertas_atencao DESC
      LIMIT 5;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
function getAlertaUnsolved(idDataCenter){
    console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirAlertas():",
  );

    let instrucaoSql = `
      select fk_servidor,idjira, valor, nomecomponente, data_gerado from alerta 
JOIN parametro_servidor as p ON fk_parametro = idparametros_servidor
JOIN componente as c ON fk_componente = idcomponente
LEFT JOIN servidor_cliente as s ON fk_servidor = idservidor
LEFT JOIN data_center as d ON iddata_center = fk_data_center
WHERE data_resolvido is NULL 
AND idjira IS NOT NULL
AND fk_data_center = '${idDataCenter}' OR fk_data_center IS NULL
ORDER BY data_gerado DESC;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
    exibirAlertas,
    getTotalAlertas,
    getQtdAlertasComponente,
    getTopServidoresAlertas,
    getAlertaUnsolved
};