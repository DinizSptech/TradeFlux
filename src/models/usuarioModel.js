let database = require("../database/config");

function autenticar(email, senha, cargo) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email,
    senha,
    cargo
  );
  var instrucaoSql = `
        SELECT idUsuario, nome, senha, cargo FROM Usuario_Cliente WHERE email = '${email}' AND senha = '${senha}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function cadastrar(nome, senha, email, cargo, empresa_cliente) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    senha,
    email,
    cargo,
    empresa_cliente
  );

  let instrucaoSql = `
        INSERT INTO Usuario_Cliente 
        (nome,email,senha,cargo,fk_cliente) VALUES 
        ('${nome}', '${email}', '${senha}', '${cargo}', '${empresa_cliente}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  cadastrar,
};
