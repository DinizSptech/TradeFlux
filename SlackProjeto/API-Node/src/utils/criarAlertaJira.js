// const jira = require("../connections/jira");

<<<<<<< HEAD
// async function criarAlertaNoJira({ summary, description }) {
//   const projetoKey = process.env.JIRA_PROJECT_KEY;

//   const payload = {
//     fields: {
//       project: { key: projetoKey },
//       summary,
//       description,
//       issuetype: { name: "Task" },
//     },
//   };

//   const resposta = await jira.post("/rest/api/3/issue", payload);
//   return resposta.data.key;
// }

// module.exports = criarAlertaNoJira;
=======
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
        // Removido o campo priority que estava causando o erro
      }
    };

    console.log("Enviando payload para Jira:", JSON.stringify(payload, null, 2));

    const resposta = await jira.post("/rest/api/3/issue", payload);
    
    console.log("Resposta do Jira:", resposta.data);
    return resposta.data.key;

  } catch (error) {
    console.error("Erro detalhado ao criar issue no Jira:");
    
    if (error.response) {
      // Erro de resposta HTTP
      console.error("Status:", error.response.status);
      console.error("Headers:", error.response.headers);
      console.error("Data:", JSON.stringify(error.response.data, null, 2));
      
      // Verificar se há erros específicos do Jira
      if (error.response.data && error.response.data.errors) {
        console.error("Erros específicos do Jira:", error.response.data.errors);
      }
      
      if (error.response.data && error.response.data.errorMessages) {
        console.error("Mensagens de erro do Jira:", error.response.data.errorMessages);
      }
      
    } else if (error.request) {
      // Erro de requisição
      console.error("Erro na requisição:", error.request);
    } else {
      // Outro tipo de erro
      console.error("Erro:", error.message);
    }
    
    throw error;
  }
}

module.exports = criarAlertaNoJira;
>>>>>>> be9942a5e2fa4b10068564993c86f73c54982628
