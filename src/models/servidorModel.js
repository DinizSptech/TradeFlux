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
        SELECT * FROM Data_Center;
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}
module.exports = {
  cadastrar,
    listarDataCenters,
};
