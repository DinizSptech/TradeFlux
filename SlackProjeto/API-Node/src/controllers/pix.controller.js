const AWS = require("aws-sdk");
AWS.config.update({ region: process.env.AWS_REGION });

async function pegarPix(req, res) {
  let nomeArquivo = "pix";

  const s3 = new AWS.S3();

  const params = {
    Bucket: `tradeflux-client`,
    Key: `dadosVictorClient/dadosClient.json`,
  };

  try {
    const data = await s3.getObject(params).promise();
    let conteudo = data.Body.toString("utf-8");
    let resposta = JSON.parse(conteudo);
    res.status(200).json(resposta);
  } catch (error) {
    console.error("Erro ao coletar dados do bucket s3.");
    res.status(500).json(error.message);
  }
}

module.exports = {
  pegarPix,
};
