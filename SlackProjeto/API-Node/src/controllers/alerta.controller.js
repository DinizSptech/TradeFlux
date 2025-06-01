const criarAlertaNoJira = require("../utils/criarAlertaNoJira");
const bdModel = require("../models/bdMYSQL.models");

async function enviarJira(req, res) {
  try {
    const { valor, medida, data, criticidade, fkparametro, servidor, componente } = req.body;

    if (criticidade !== 3) {
      return res.status(200).send("Alerta recebido, mas criticidade != 3. Não enviado ao Jira.");
    }

    const summary = `ALERTA CRÍTICO - ${componente} no servidor ${servidor}`;
    const description = `Valor: ${valor}\nMedida: ${medida}\nData: ${data}\nParâmetro: ${fkparametro}`;

    const issueKey = await criarAlertaNoJira({ summary, description });

    await bdModel.insert_alerta_com_issueKey(valor, medida, data, criticidade, fkparametro, servidor, componente, issueKey);

    res.status(201).send(`Alerta crítico criado no Jira com issueKey ${issueKey}`);
  } catch (err) {
    console.error("Erro ao enviar alerta ao Jira:", err);
    res.status(500).send("Erro ao processar alerta.");
  }
}

async function receberWebhook(req, res) {
  try {
    const { issue, changelog } = req.body;

    if (!issue || !changelog) {
      return res.status(400).send("Formato de webhook inválido.");
    }

    const movidoPara = changelog.items.find(item => item.field === "status");
    if (movidoPara && movidoPara.toString === "ALERTAS CRÍTICOS CONCLUÍDOS") {
      const issueKey = issue.key;
      const dataConclusao = new Date().toISOString().slice(0, 19).replace("T", " ");

      await bdModel.update_alerta_concluido(issueKey, dataConclusao);
      return res.status(200).send("Alerta marcado como concluído.");
    }

    res.status(200).send("Mudança de status ignorada.");
  } catch (err) {
    console.error("Erro no webhook do Jira:", err);
    res.status(500).send("Erro interno ao tratar webhook.");
  }
}

module.exports = {
  enviarJira,
  receberWebhook
};
