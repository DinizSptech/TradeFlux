let database = require("../database/config");

function cadastrar(dataCenter) {
    console.log(
        "ACESSEI O SERVIDOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
        dataCenter
    );
    
    let instrucaoSql = `
            INSERT INTO servidor_cliente (idservidor, fk_data_center) VALUES(default, ${dataCenter});
        `;
    console.log("Executando a instrução SQL: \n" + instrucaoSql);
    return database.executar(instrucaoSql, [dataCenter]);
}

function listarDataCenters() {
  console.log(
    "ACESSEI O SERVIDOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarDataCenters():",
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
  select sc.idservidor, sc.fk_data_center,
    count(ps.idparametros_servidor) as totalComponentes,
    case 
        when count(a.idAlerta) > 0 then 'Crítico'
        else 'Estável'
    end as statusServidor,
  count(a2.idalerta) as alertas_hoje
  from servidor_cliente as sc
  left join parametro_servidor ps 
  on ps.fk_servidor = sc.idservidor
  left join alerta a 
    on a.fk_parametro = ps.idparametros_servidor 
    and a.data_gerado >= NOW() - interval 2 hour
  left join alerta a2 
    on a2.fk_parametro = ps.idParametros_Servidor 
    and date(a2.data_gerado) = CURDATE()
  group by sc.idServidor;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarServidor(servidor, componente, valor) {
  console.log(
    "ACESSEI O SERVIDOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarServidor():",
  );

  let instrucaoSql = `
        UPDATE servidor_cliente SET ${componente} = "${valor}" WHERE idservidor = ${servidor};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluir(servidorSelecionadoParaExcluir) {
  console.log(
    "ACESSEI O SERVIDOR MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():",
  );

  let instrucaoSql = `

     DELETE A
    FROM alerta A
    JOIN parametro_servidor P ON A.fk_parametro = P.idparametros_servidor
    WHERE P.fk_servidor = ${servidorSelecionadoParaExcluir};
    DELETE from parametro_servidor where fk_servidor = ${servidorSelecionadoParaExcluir};
    DELETE FROM servidor_cliente where idservidor = ${servidorSelecionadoParaExcluir}
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
  cadastrar,
    listarDataCenters,
    exibirServidores,
    editarServidor,
    excluir
};