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
module.exports = {
    exibirAlertas
};