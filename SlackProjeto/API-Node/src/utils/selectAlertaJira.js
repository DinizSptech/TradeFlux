const jira = require("../connections/jira");

async function selectAlertaNoJira(summary) {
  try{

    const projetoKey = process.env.JIRA_PROJECT_KEY;
    
    if (!projetoKey) {
      throw new Error("JIRA_PROJECT_KEY não está definida nas variáveis de ambiente");
    }

    
    const resultadoSelect = await jira.get('/rest/api/3/search', { 
      params: { jql: `summary ~ "${summary}" AND project = "${projetoKey}"` }
    })
    
    console.log("Resultado do select no jira:\n" + JSON.stringify(resultadoSelect.data.issues))

    if(resultadoSelect.data.issues.length == 0){
      console.log("Alerta já inserido no jira")
      return false
    } else {
      return true
    }
  } catch (erro){
    console.log("Erro ao enviar ao jira: " + erro)
  } 
    

}

module.exports = selectAlertaNoJira