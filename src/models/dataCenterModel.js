var database = require("../database/config");

function cadastrar(
  nome,
  logradouro,
  bairro,
  cidade,
  uf,
  numero,
  cep,
  complemento
) {
  console.log(
    "ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente. \n\n function cadastrar():",
    nome,
    logradouro,
    bairro,
    cidade,
    uf,
    numero,
    cep,
    complemento
  );

  let instrucaoSql = `
       INSERT INTO endereco (cep, logradouro, numero, bairro, cidade, uf, complemento) VALUES 
        ('${cep}', '${logradouro}', '${numero}', '${bairro}', '${cidade}', '${uf}', '${complemento}');

        INSERT INTO data_center (nome, fk_endereco, fk_cliente) VALUES
        ('${nome}', LAST_INSERT_ID(), 1);
    `;
  console.log("Executando a instrução SQL: \n" + instrucaoSql);
  return database.executar(instrucaoSql);
}

function exibir(nome) {
  console.log("Nome Data Center:" + nome);

  let instrucaoSql = `
  SELECT * from vw_dashDataCenter`;

  console.log(instrucaoSql);

  return database.executar(instrucaoSql);
}

module.exports = {
  cadastrar,
  exibir,
};
