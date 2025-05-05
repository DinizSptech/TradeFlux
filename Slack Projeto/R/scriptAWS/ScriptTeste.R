# Caso seja sua primeira vez utilizando o arquivo, descomente o seguinte comando para a instalação do pacote:
# install.packages('aws.s3')

library(aws.s3)

# Preencha as seguintes informações:

Sys.setenv(
  "AWS_ACCESS_KEY_ID" = "",
  "AWS_SECRET_ACCESS_KEY" = "",
  "AWS_DEFAULT_REGION" = "us-east-1"
)

bucket_name <- "bucket-trusted-tradeflux"

# Caso tenha alguma dúvida, segue abaixo a documentação:
# https://www.rdocumentation.org/packages/aws.s3/versions/0.1.33