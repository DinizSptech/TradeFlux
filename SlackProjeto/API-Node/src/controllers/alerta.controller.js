const criarAlertaNoJira = require("../utils/criarAlertaJira");
const selectAlertaNoJira = require("../utils/selectAlertaJira")
const bdModel = require("../models/bdMYSQL.models");

async function enviarJira(req, res) {
  const { valor, medida, data, criticidade, fkparametro, servidor, componente } = req.body;

  // Sempre inserir no banco de dados primeiro
  await bdModel.insert_alerta(valor, medida, data, criticidade, fkparametro);

  // Verificar se é alerta de atenção (1) ou crítico (3)
  if (criticidade !== 1 && criticidade !== 3) {
    return res.status(200).json({
      success: true,
      message: "Alerta registrado no banco. Criticidade não requer envio ao Jira.",
      criticidade: criticidade
    });
  }
  
  // Determinar tipo de alerta para o Jira
  const tipoAlerta = criticidade === 3 ? "CRÍTICO" : "ATENÇÃO";
  const description = `Valor: ${valor}\nMedida: ${medida}\nData: ${data}\nParâmetro: ${fkparametro}`;
  const summary = `ALERTA ${tipoAlerta} - ${componente} no servidor ${servidor}`;
  
  let jaInserido = false;
  
  try {
    jaInserido = await selectAlertaNoJira(servidor, componente);
  } catch (erro) {
    console.log("Erro ao buscar no Jira:", erro.message);
  }

  // Recheck após delay se não encontrou
  if (!jaInserido) {
    await new Promise(resolve => setTimeout(resolve, 3000));
    try {
      jaInserido = await selectAlertaNoJira(servidor, componente);
    } catch (erro) {
      console.log("Erro no recheck do Jira:", erro.message);
    }
  }

  if (!jaInserido) {
    try {
      const issueKey = await criarAlertaNoJira({ summary, description });
      
      // Atualizar o alerta mais recente com o issueKey do Jira e marcar possui_idjira = 1
      await bdModel.update_alerta_com_jira(fkparametro, data, issueKey);

      res.status(201).json({
        success: true,
        message: `Alerta ${tipoAlerta.toLowerCase()} criado no Jira`,
        issueKey: issueKey
      });
    } catch (err) {
      console.error("Erro ao criar issue no Jira:", err.message);
      res.status(500).json({
        success: false,
        error: "Erro ao processar alerta no Jira",
        details: err.message
      });
    }
  } else {
    res.status(200).json({
      success: true,
      message: `Alerta registrado. Issue já existe para ${componente} no servidor ${servidor}`,
      tipoAlerta: tipoAlerta
    });
  }
}

async function receberWebhook(req, res) {
  try {
    const { issue, changelog } = req.body;

    if (!issue || !changelog) {
      return res.status(400).json({
        success: false,
        error: "Formato de webhook inválido."
      });
    }

    const issueKey = issue.key;
    const statusAtual = issue.fields?.status?.name;

    if (statusAtual === "Alertas Resolvidos") {
      const agora = new Date();
      const dataConclusao = agora.toLocaleString('sv-SE', { 
        timeZone: 'America/Sao_Paulo' 
      }).replace('T', ' ');
      
      await bdModel.update_alerta_concluido(issueKey, dataConclusao);

      return res.status(200).json({
        success: true,
        message: "Alertas marcados como resolvidos",
        issueKey: issueKey,
        dataConclusao: dataConclusao
      });
    }
    
    res.status(200).json({
      success: true,
      message: `Webhook processado - status '${statusAtual}' não requer ação`
    });

  } catch (err) {
    console.error("Erro no webhook:", err.message);
    res.status(500).json({
      success: false,
      error: "Erro interno ao processar webhook",
      details: err.message
    });
  }
}

module.exports = {
  enviarJira,
  receberWebhook
};