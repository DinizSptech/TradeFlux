let database = require("../database/config");

function cadastrar(componente, limiar, servidor) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    limiar,
    servidor,
    componente
  );

  let instrucaoSql = `
        INSERT INTO parametro_servidor 
        (limiar_alerta, fkServidor, fkComponente) VALUES
        ('${limiar}', '${servidor}', ${componente});
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function listarServidores() {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarServidores():",
  );

  let instrucaoSql = `
        SELECT * FROM servidor_cliente;

    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function listarComponentes(servidor) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarComponentes():",
  );

  let instrucaoSql = `
        SELECT * FROM componente;

        
        SELECT * FROM parametro_servidor where fkServidor = ${servidor};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function exibirComponentes(dataCenter) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirComponentes():",
  );

  let instrucaoSql = `
          select idParametros_Servidor, nomeComponente, c.medida, limiar_alerta, fkServidor, fkDatacenter,
          case 
                when count(a.idAlerta) > 0 then 'Crítico'
                else 'Estável'
          end as statusComponente
        from Componente as c left join Parametro_Servidor as ps
        on c.idComponente = ps.fkComponente
        left join Alerta a 
        on a.fkParametro = ps.idParametros_Servidor 
        and a.data >= NOW() - interval 2 hour
        left join Servidor_Cliente as sc
        on ps.fkServidor = sc.idServidor
        where sc.fkDataCenter = ${dataCenter}
        GROUP BY 
        ps.idParametros_Servidor
        order by ps.fkServidor;
`;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function excluir(componenteSelecionadoParaExcluir) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function excluir():",
  );

  let instrucaoSql = `
    DELETE A
    FROM Alerta A
    JOIN Parametro_Servidor P ON A.fkParametro = P.idParametros_Servidor
    WHERE A.fkParametro = ${componenteSelecionadoParaExcluir};
    DELETE from Parametro_Servidor where idParametros_Servidor = ${componenteSelecionadoParaExcluir};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarComponente(parametroComponente, valor) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarComponente():",
  );

  let instrucaoSql = `
        UPDATE Parametro_Servidor SET limiar_alerta = ${valor} WHERE idParametros_Servidor = ${parametroComponente};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
    listarServidores,
    cadastrar,
    listarComponentes,
    exibirComponentes,
    excluir,
    editarComponente
};
