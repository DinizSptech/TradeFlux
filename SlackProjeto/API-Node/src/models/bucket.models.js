// const { PutObjectCommand } = require("@aws-sdk/client-s3");
const { GetObjectCommand } = require("@aws-sdk/client-s3");
const s3 = require("../connections/bucket");

async function salvandoImagem(nomeArquivo, buffer, mimeType) {
  // const comando = new PutObjectCommand({
  //     Bucket: "bucketFotosUsuarios",
  //     Key: `fotos/${nomeArquivo}`,
  //     Body: buffer,
  //     ContentType: mimeType
  // });

  // await s3.send(comando);

  console.log("");
}

async function pegarPix() {
  try {
    const command = new GetObjectCommand({
      Bucket: "cliente-pix",
      Key: "dadosClient.json",
    });

    const response = await s3.send(command);

    const dadosString = await resposta.Body.transformToString();
    const dadosJson = JSON.parse(dadosString);
    return dadosJson;
  } catch (error) {
    console.error("Erro ao buscar dados", error);
    throw error;
  }
}

module.exports = {
  salvandoImagem,
  pegarPix,
};
