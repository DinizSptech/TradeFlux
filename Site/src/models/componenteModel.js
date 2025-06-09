let database = require("../database/config");

function cadastrar(componente, limiarAtencao, limiarCritico, servidor) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    limiar,
    servidor,
    componente
  );

  let instrucaoSql = `
        INSERT INTO parametro_servidor 
        (limiar_alerta_atencao, limiar_alerta_critico, fk_servidor, fk_componente) VALUES
        ('${limiarAtencao}','${limiarCritico}', '${servidor}', ${componente});
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

        
        SELECT * FROM parametro_servidor where fk_servidor = ${servidor};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function exibirComponentes(dataCenter) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function exibirComponentes():",
  );

  let instrucaoSql = `
          select idparametros_servidor, nomecomponente, c.medida, limiar_alerta_critico, limiar_alerta_atencao, fk_servidor,
          case 
                when count(a.idalerta) > 0 then 'Crítico'
                else 'Estável'
          end as statusComponente
        from componente as c left join parametro_servidor as ps
        on c.idcomponente = ps.fk_componente
        left join alerta a 
        on a.fk_parametro = ps.idparametros_servidor 
        and a.data_gerado >= NOW() - interval 2 hour
        left join servidor_cliente as sc
        on ps.fk_servidor = sc.idservidor
        where ps.fk_servidor IS NOT NULL
        GROUP BY 
          ps.idparametros_servidor,
          c.nomecomponente,
          c.medida,
          ps.limiar_alerta_critico,
          ps.limiar_alerta_atencao,
          ps.fk_servidor
        order by ps.fk_servidor;
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
    FROM alerta A
    JOIN parametro_servidor P ON A.fk_parametro = P.idparametros_servidor
    WHERE A.fk_parametro = ${componenteSelecionadoParaExcluir};
    DELETE from parametro_servidor where idparametros_servidor = ${componenteSelecionadoParaExcluir};
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function editarComponente(parametroComponente, limiarAtencao, limiarCritico) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function editarComponente():",
  );
 
  let instrucaoSql = `
        UPDATE parametro_servidor SET limiar_alerta_critico = ${limiarCritico}, limiar_alerta_atencao = ${limiarAtencao} WHERE idparametros_servidor = ${parametroComponente};
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