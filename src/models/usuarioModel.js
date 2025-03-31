let database = require("../database/conig");

function cadastrar(nome, senha, email, cargo) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    senha,
    email,
    cargo
  );

  let instrucaoSql = `
        INSERT INTO Usuario_Cliente 
        (nome,email,senha,cargo) VALUES 
        ('${nome}', '${senha}', '${email}', '${cargo}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
};
