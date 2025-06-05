const bd = require("../connections/bd");

function insert_alerta(valor, medida, data, criticidade, fkparametro) {
    console.log("Acessando model para inserir alerta");
    let instrucaosql = `
        INSERT INTO alerta (valor, medida, data_gerado, criticidade, fk_parametro)
        VALUES ('${valor}', '${medida}', '${data}', '${criticidade}', '${fkparametro}');
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
        SELECT * FROM parametro_servidor WHERE fk_servidor = '${id}' OR fk_servidor IS NULL;
    `;
    console.log("Executando a instrução:" + instrucaosql);
    return bd.executarSelect(instrucaosql);
}

function insert_alerta_com_issueKey(valor, medida, data, criticidade, fkparametro, servidor, componente, issueKey) {
    console.log("Acessando model para inserir alerta com issueKey");
    const instrucao = `
        INSERT INTO alerta (idjira, valor, medida, data_gerado, criticidade, fk_parametro)
        VALUES ('${issueKey}', '${valor}', '${medida}', '${data}', '${criticidade}', '${fkparametro}');
    `;
    console.log("Executando a instrução:" + instrucao);
    return bd.executarInsert(instrucao);
}

function update_alerta_com_jira(fkparametro, data, issueKey) {
    console.log("Acessando model para atualizar alerta com issueKey do Jira");
    const instrucao = `
        UPDATE alerta 
        SET idjira = '${issueKey}' 
        WHERE fk_parametro = '${fkparametro}' 
        AND data_gerado = '${data}' 
        AND idjira IS NULL 
        ORDER BY idalerta DESC 
        LIMIT 1;
    `;
    console.log("Executando a instrução:" + instrucao);
    return bd.executarInsert(instrucao);
}

function update_alerta_concluido(issueKey, dataConclusao) {
    console.log("Acessando model para marcar alerta como concluído");
    const instrucao = `
        UPDATE alerta 
        SET data_resolvido = '${dataConclusao}' 
        WHERE idjira = '${issueKey}';
    `;
    console.log("Executando a instrução:" + instrucao);
    return bd.executarInsert(instrucao);
}

module.exports = {
    insert_alerta,
    insert_servidor,
    select_servidor,
    select_parametro,
    insert_alerta_com_issueKey,
    update_alerta_com_jira,
    update_alerta_concluido
};