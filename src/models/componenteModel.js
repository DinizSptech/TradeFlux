let database = require("../database/config");

function cadastrar(nome, medida, limiar, servidor) {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    medida,
    limiar,
    servidor,
  );

  let instrucaoSql = `
        INSERT INTO Componente
        (componente, medida) VALUES 
        ('${nome}', '${medida}');

        INSERT INTO Parametro_Servidor 
        (limiar_alerta, fk_Servidor, fk_Componente) VALUES
        ('${limiar}', '${servidor}', LAST_INSERT_ID());
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}


function listarServidores() {
  console.log(
    "ACESSEI O COMPONENTE MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function listarServidores():",
  );

  let instrucaoSql = `
        SELECT * FROM Servidor_Cliente;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
    listarServidores,
    cadastrar
};
