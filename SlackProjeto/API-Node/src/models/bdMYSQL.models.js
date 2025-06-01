const bd = require("../connections/bd");

function insert_alerta(valor, medida, data, criticidade, fkparametro, servidor, componente) {
    console.log("Acessando model para inserir alerta");
    let instrucaosql = `
        INSERT INTO alerta (valor, medida, data_gerado, criticidade, fkparametro, servidor, componente)
        VALUES ('${valor}', '${medida}', '${data}', '${criticidade}', '${fkparametro}', '${servidor}', '${componente}');
    `;
    console.log("Executando a instrução:" + instrucaosql);
    return bd.executarInsert(instrucaosql);
}

function insert_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo) {
    console.log("Acessando model para inserir servidor");
    let instrucaosql = `
        INSERT INTO servidor_cliente (uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo, fk_data_center)
        VALUES ('${uuidservidor}', '${sistemaoperacional}', '${discototal}', '${ramtotal}', '${processadorinfo}', ${id_datacenter});
    `;
    console.log("Executando a instrução:" + instrucaosql);
    return bd.executarInsert(instrucaosql);
}

function select_servidor(uuid) {
    console.log("Acessando model para buscar servidor");
    let instrucaosql = `
        SELECT * FROM servidor_cliente WHERE uuidservidor = '${uuid}';
    `;
    console.log("Executando a instrução:" + instrucaosql);
    return bd.executarSelect(instrucaosql);
}

function select_parametro(id) {
    console.log("Acessando model para buscar parâmetros");
    let instrucaosql = `
        SELECT * FROM parametro_servidor WHERE fk_servidor = ${id} OR fk_servidor IS NULL;
    `;
    console.log("Executando a instrução:" + instrucaosql);
    return bd.executarSelect(instrucaosql);
}

function insert_alerta_com_issueKey(valor, medida, data, criticidade, fkparametro, servidor, componente, issueKey) {
    const instrucao = `
        INSERT INTO alerta (idjira, valor, medida, data_gerado, criticidade, fkparametro)
        VALUES ('${issueKey}', '${valor}', '${medida}', '${data}', '${criticidade}', '${fkparametro}');
    `;
    return bd.executarInsert(instrucao);
}

function update_alerta_concluido(issueKey, dataConclusao) {
    const instrucao = `
        UPDATE alerta SET dataConclusao = '${dataConclusao}' WHERE issueKey = '${issueKey}';
    `;
    return bd.executarInsert(instrucao);
}

module.exports = {
    insert_alerta,
    insert_servidor,
    select_servidor,
    select_parametro,
    insert_alerta_com_issueKey,
    update_alerta_concluido
};