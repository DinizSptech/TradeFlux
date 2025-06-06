const criarAlertaNoJira = require("../utils/criarAlertaJira");
const selectAlertaNoJira = require("../utils/selectAlertaJira")
const bdModel = require("../models/bdMYSQL.models");

async function enviarJira(req, res) {
  const { valor, medida, data, criticidade, fkparametro, servidor, componente } = req.body;

  if (criticidade !== 3) {
    console.log(`Inserindo alerta MODERADO de ${componente} `)
    await bdModel.insert_alerta(valor, medida, data, criticidade, fkparametro);
    return res.status(200).json({
      success: true,
      message: "Alerta recebido e salvo no banco, mas criticidade != 3. Não enviado ao Jira.",
      criticidade: criticidade
    });
  }
  
  // Se for crítico, criar no Jira também
  
  const description = `Valor: ${valor}\nMedida: ${medida}\nData: ${data}\nParâmetro: ${fkparametro}`;
  const summary = `ALERTA CRÍTICO - ${componente} no servidor ${servidor}`;
  let existe
  try {
    console.log("Fazendo select no jira!\n\n")
    console.log(summary)
    existe = await selectAlertaNoJira(summary)
  } catch (erro) {
    console.log("Erro ao buscar no jira: " + erro)
  }
  console.log
  if(existe){
  try{
    console.log("Criando alerta no jira!\n\n")
    const issueKey = await criarAlertaNoJira({ summary, description });
    console.log("Inserindo alerta CRÍTICO!\n\n")
    await bdModel.insert_alerta(valor, medida, data, criticidade, fkparametro);
    // Atualizar o alerta com o issueKey do Jira
    await bdModel.update_alerta_com_jira(fkparametro, data, issueKey);

    res.status(201).json({
      success: true,
      message: `Alerta crítico criado no Jira com issueKey ${issueKey}`,
      issueKey: `Issue key: ${issueKey}`
    });
  } catch (err) {
    console.error("Erro ao enviar alerta ao Jira:", err);
    res.status(500).json({
      success: false,
      error: "Erro ao processar alerta.",
      details: err.message
    });
  }
} else {
  console.log("Alerta já inserido no jira")
}
}

async function receberWebhook(req, res) {
  try {
    const { issue, changelog } = req.body;

    // Validação básica
    if (!issue || !changelog) {
      console.log("Webhook inválido - issue ou changelog ausente");
      return res.status(400).json({
        success: false,
        error: "Formato de webhook inválido."
      });
    }

    const issueKey = issue.key;
    const statusAtual = issue.fields?.status?.name;
    
    console.log(`Webhook recebido para ${issueKey} - Status atual: ${statusAtual}`);

    if (statusAtual === "Alertas Críticos Resolvidos") {
      console.log(`Alerta ${issueKey} está RESOLVIDO - atualizando banco`);
      
      const agora = new Date();
      const dataConclusao = agora.toLocaleString('sv-SE', { 
        timeZone: 'America/Sao_Paulo' 
      }).replace('T', ' ');
      await bdModel.update_alerta_concluido(issueKey, dataConclusao);
      
      console.log(`Alerta ${issueKey} marcado como concluído em ${dataConclusao}`);

      return res.status(200).json({
        success: true,
        message: "Alerta marcado como concluído.",
        issueKey: issueKey,
        dataConclusao: dataConclusao
      });
    }

    console.log(`Alerta ${issueKey} ainda não resolvido (Status: ${statusAtual})`);
    
    res.status(200).json({
      success: true,
      message: `Webhook processado - status '${statusAtual}' não requer ação.`
    });

  } catch (err) {
    console.error("Erro no webhook do Jira:", err.message);
    res.status(500).json({
      success: false,
      error: "Erro interno ao tratar webhook.",
      details: err.message
    });
  }
}

module.exports = {
  enviarJira,
  receberWebhook
};