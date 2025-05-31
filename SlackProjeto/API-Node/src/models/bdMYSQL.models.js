const bd = require("../connections/bd");

function insert_alerta(valor, medida, data, criticidade, fkparametro, servidor, componente){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
 let instrucaosql = `

 `
 console.log("Executando a instrução:" + instrucaosql)
 return bd.executarInsert(instrucaosql)
}

function insert_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
 let instrucaosql = `

 `
 console.log("Executando a instrução:" + instrucaosql)
 return bd.executarInsert(instrucaosql)
}

function select_servidor(id){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
 let instrucaosql = `

 `
 console.log("Executando a instrução:" + instrucaosql)
 return bd.executarSelect(instrucaosql)
}

function select_parametro(id){
  console.log("ACESSEI O USUARIO MODEL \n \n\t\t >> Se aqui der erro de 'Error: connect ECONNREFUSED',\n \t\t >> verifique suas credenciais de acesso ao banco\n \t\t >> e se o servidor de seu BD está rodando corretamente.")
 let instrucaosql = `

 `
 console.log("Executando a instrução:" + instrucaosql)
 return bd.executarSelect(instrucaosql)
}


module.exports = {
insert_alerta,
insert_servidor,
select_servidor,
select_parametro
};
