let database = require("../database/config");

function cadastrar(dataCenter) {
    console.log(
        "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
        dataCenter
    );
    
    let instrucaoSql = `
            INSERT INTO servidor_cliente (idServidor, fk_data_center) VALUES(default, ${dataCenter});
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [dataCenter]);
}


function listarDataCenters() {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDataCenters():",
  );

  let instrucaoSql = `
        SELECT * FROM data_center;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function exibirServidores(dataCenter) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirServidores():",
  );

  let instrucaoSql = `
  select sc.idServidor,
    count(ps.idParametros_Servidor) as totalComponentes,
    case 
        when count(a.idAlerta) > 0 then 'Crítico'
        else 'Estável'
    end as statusServidor,
  count(a2.idAlerta) as alertas_hoje
  from Servidor_Cliente as sc
  left join Parametro_Servidor ps 
  on ps.fkServidor = sc.idServidor
  left join Alerta a 
    on a.fkParametro = ps.idParametros_Servidor 
    and a.data >= NOW() - interval 2 hour
  left join Alerta a2 
    on a2.fkParametro = ps.idParametros_Servidor 
    and date(a2.data) = CURDATE()
  where sc.fkDataCenter = ${dataCenter}
  group by sc.idServidor;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarServidor(servidor, componente, valor) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarServidor():",
  );

  let instrucaoSql = `
        UPDATE Servidor_Cliente SET ${componente} = "${valor}" WHERE idServidor = ${servidor};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
  cadastrar,
    listarDataCenters,
    exibirServidores,
    editarServidor
};
