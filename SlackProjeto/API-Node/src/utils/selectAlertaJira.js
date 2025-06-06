const jira = require("../connections/jira");

async function selectAlertaNoJira(servidor, componente) {
  try{

    const projetoKey = process.env.JIRA_PROJECT_KEY;
    
    if (!projetoKey) {
      throw new Error("JIRA_PROJECT_KEY não está definida nas variáveis de ambiente");
    }

    
    const resultadoSelect = await jira.get('/rest/api/3/search', { 
      params: { jql: `summary ~ "${servidor} ${componente}" AND project = "${projetoKey}"` }
    })
    
    console.log("Tamanho issues:\n" + JSON.stringify(resultadoSelect.data.issues.length))

    if(resultadoSelect.data.issues.length == 0){
      console.log("Alerta ainda não inserido no Jira!")
      return false 
    } else {
      console.log("Alerta já inserido no Jira!")
      return true
    }
  } catch (erro){
    console.log("Erro ao enviar ao jira: " + erro)
  } 
    

}

module.exports = selectAlertaNoJira