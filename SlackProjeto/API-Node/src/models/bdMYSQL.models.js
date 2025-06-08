const bd = require("../connections/bd");

function insert_alerta(valor, medida, data, criticidade, fkparametro) {
    let instrucaosql = `
        INSERT INTO alerta (valor, medida, data_gerado, criticidade, fk_parametro)
        VALUES ('${valor}', '${medida}', '${data}', '${criticidade}', '${fkparametro}');
    `;
    return bd.executarInsert(instrucaosql);
}

function insert_servidor(id_datacenter, uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo) {
    let instrucaosql = `
        INSERT INTO servidor_cliente (uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo, fk_data_center)
        VALUES ('${uuidservidor}', '${sistemaoperacional}', '${discototal}', '${ramtotal}', '${processadorinfo}', ${id_datacenter});
    `;
    return bd.executarInsert(instrucaosql);
}

function insert_parametros(id_servidor, limiar_atencao, limiar_critico) {
    let instrucaosql = `
        INSERT INTO parametro_servidor (limiar_alerta_atencao, limiar_alerta_critico, fk_servidor, fk_componente)
        VALUES ('${limiar_atencao}', '${limiar_critico}', '${id_servidor}', 1);
        INSERT INTO parametro_servidor (limiar_alerta_atencao, limiar_alerta_critico, fk_servidor, fk_componente)
        VALUES ('${limiar_atencao}', '${limiar_critico}', '${id_servidor}', 3);
        INSERT INTO parametro_servidor (limiar_alerta_atencao, limiar_alerta_critico, fk_servidor, fk_componente)
        VALUES ('${limiar_atencao}', '${limiar_critico}', '${id_servidor}', 5);
    `;
    return bd.executarInsert(instrucaosql);
}

function select_servidor(uuid) {
    let instrucaosql = `
        SELECT * FROM servidor_cliente WHERE uuidservidor = '${uuid}';
    `;
    return bd.executarSelect(instrucaosql);
}

function select_parametro(id) {
    let instrucaosql = `
        SELECT * FROM parametro_servidor WHERE fk_servidor = '${id}';
    `;
    return bd.executarSelect(instrucaosql);
}

function update_alerta_com_jira(fkparametro, data, issueKey) {
    const instrucao = `
        UPDATE alerta 
        SET idjira = '${issueKey}', possui_idjira = 1
        WHERE fk_parametro = '${fkparametro}' 
        AND data_gerado = '${data}' 
        AND idjira IS NULL 
        ORDER BY idalerta DESC 
        LIMIT 1;
    `;
    return bd.executarInsert(instrucao);
}

function update_alerta_concluido(issueKey, dataConclusao) {
    // Primeiro, obter o fk_parametro da issue que está sendo resolvida
    const selectInstrucao = `
        SELECT fk_parametro FROM alerta WHERE idjira = '${issueKey}' LIMIT 1;
    `;
    
    return bd.executarSelect(selectInstrucao).then(resultado => {
        if (resultado && resultado.length > 0) {
            const fkParametro = resultado[0].fk_parametro;
            
            // Atualizar todos os alertas não resolvidos para este parâmetro (servidor + componente)
            const updateInstrucao = `
                UPDATE alerta 
                SET data_resolvido = '${dataConclusao}' 
                WHERE fk_parametro = '${fkParametro}' 
                AND data_resolvido IS NULL;
            `;
            return bd.executarInsert(updateInstrucao);
        }
        throw new Error(`Issue ${issueKey} não encontrada no banco de dados`);
    });
}

module.exports = {
    insert_alerta,
    insert_servidor,
    insert_parametros,
    select_servidor,
    select_parametro,
    update_alerta_com_jira,
    update_alerta_concluido
};