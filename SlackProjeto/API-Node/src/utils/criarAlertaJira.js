const jira = require("../connections/jira");

async function criarAlertaNoJira({ summary, description }) {
  try {
    const projetoKey = process.env.JIRA_PROJECT_KEY;
    
    if (!projetoKey) {
      throw new Error("JIRA_PROJECT_KEY não está definida nas variáveis de ambiente");
    }

    const payload = {
      fields: {
        project: { 
          key: projetoKey 
        },
        summary: summary,
        description: {
          type: "doc",
          version: 1,
          content: [
            {
              type: "paragraph",
              content: [
                {
                  type: "text",
                  text: description
                }
              ]
            }
          ]
        },
        issuetype: { 
          name: "Task" 
        }
      }
    };

    const resposta = await jira.post("/rest/api/3/issue", payload);
    return resposta.data.key;

  } catch (error) {
    console.error("Erro ao criar issue no Jira:");
    
    if (error.response) {
      console.error("Status:", error.response.status);
      console.error("Detalhes:", JSON.stringify(error.response.data, null, 2));
    } else {
      console.error("Erro:", error.message);
    }
    
    throw error;
  }
}

module.exports = criarAlertaNoJira;