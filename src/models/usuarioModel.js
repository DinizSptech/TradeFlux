let database = require("../database/config");

function autenticar(email) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function entrar(): ",
    email
    // senha,
    // cargo
  );
  var instrucaoSql = `
        SELECT idUsuario, nome, senha, cargo, fkDataCenter FROM usuario_cliente WHERE email = '${email}';
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

// Funcao pra atualizar a hora do último acesso do usuario quando ele fizer login. O curtime() pega a hora atual:
// "Não finalizada ainda."
function atualizarAcesso() {
  let instrucaoSql = `update usuario_cliente
    set acesso = curtime()
    where idUsuario = 1;`;
  return database.executar(instrucaoSql);
}

function cadastrar(nome, senha, email, cargo, ativo, data_center) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    senha,
    email,
    cargo,
    ativo,
    data_center
  );

  let instrucaoSql = `
        INSERT INTO usuario_cliente 
        (nome,email,senha,cargo,ativo,fkDataCenter) VALUES 
        ('${nome}', '${email}', '${senha}', '${cargo}','${ativo}','${data_center}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function exibir(nome, email, cargo, ativo, acesso) {
  console.log(nome, email, cargo, ativo, acesso);

  let instrucaoSql = `SELECT nome,email,cargo,ativo,acesso from usuario_cliente`;
  console.log(instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  autenticar,
  atualizarAcesso,
  cadastrar,
  exibir,
};
