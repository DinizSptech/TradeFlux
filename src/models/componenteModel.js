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
module.exports = {
    listarServidores,
    cadastrar,
    listarComponentes
};
