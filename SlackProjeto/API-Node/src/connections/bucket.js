// const { S3Client } = require("@aws-sdk/client-s3");
// const { fromEnv } = require("@aws-sdk/credential-provider-env");
 
const s3 = new S3Client({
    region: process.env.AWS_REGION,
    credentials: fromEnv()
    // Isso daqui faz ele buscar as credenciais através do .env
});

module.exports = s3;