const database = require("../database/config");

// Coloque os mesmos parâmetros aqui. Vá para a var instrucaoSql
function cadastrarUsuario(nome, senha, email, cargo, ativo, fk_cliente) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    senha,
    email,
    cargo,
    ativo,
    fk_cliente
  );

  let instrucaoSql = `
        INSERT INTO Usuario_Cliente 
        (nome,email,senha,cargo,ativo,fk_cliente) VALUES 
        ('${nome}', '${senha}', '${email}', '${cargo}', '${ativo}', '${fk_cliente}');
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrarUsuario,
};
