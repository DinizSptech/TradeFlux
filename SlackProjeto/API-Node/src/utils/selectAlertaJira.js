const jira = require("../connections/jira");

async function selectAlertaNoJira(servidor, componente) {
  try {
    const projetoKey = process.env.JIRA_PROJECT_KEY;
    
    if (!projetoKey) {
      throw new Error("JIRA_PROJECT_KEY não está definida nas variáveis de ambiente");
    }

    // Buscar issues em aberto (não resolvidas) para este servidor e componente
    const jql = `summary ~ "${servidor} ${componente}" AND project = "${projetoKey}" AND status != "Alertas Resolvidos"`;
    
    const resultadoSelect = await jira.get('/rest/api/3/search', { 
      params: { jql: jql }
    });

    return resultadoSelect.data.issues.length > 0;
    
  } catch (erro) {
    console.error("Erro ao buscar no Jira:", erro.message);
    throw erro;
  }
}

module.exports = selectAlertaNoJira;