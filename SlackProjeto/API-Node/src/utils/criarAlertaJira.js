const jira = require("../connections/jira");

async function criarAlertaNoJira({ summary, description }) {
  const projetoKey = process.env.JIRA_PROJECT_KEY;

  const payload = {
    fields: {
      project: { key: projetoKey },
      summary,
      description,
      issuetype: { name: "Task" }
    }
  };

  const resposta = await jira.post("/rest/api/3/issue", payload);
  return resposta.data.key;
}

module.exports = criarAlertaNoJira;
