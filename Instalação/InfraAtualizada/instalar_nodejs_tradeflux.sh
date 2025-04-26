#!/bin/bash

# Script para instalar Node.js 20.18 e clonar o repositório TradeFlux
# Pra rodar, dê chmod com permissão de instalação e dps rode como root se não, não funcionará: 
# E só pra ter certeza de não dar merda, dá:

# nano instalar_nodejs_tradeflux.sh
# Aí vc copia tudo que tá aqui e dá o comando abaixo:
# chmod +x instalar_nodejs_tradeflux.sh && sudo ./instalar_nodejs_tradeflux.sh

echo "=== Iniciando script de instalação do Node.js 20.18 e clone do TradeFlux ==="

echo "=== Atualizando o sistema ==="
apt update && apt upgrade -y

echo "=== Instalando dependências necessárias ==="
apt install -y curl git

echo "=== Instalando Node.js 20.18 ==="
# Adicionar o repositório NodeSource
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Pra gente ver se baixou a nossa verão msm (20.18) ou se caducou o Script
npm_version=$(npm -v)
echo "NPM versão $npm_version instalado."

# Fazendo a versão errada que o Edu recomendou não fazer por enquanto, mas tamo ae
echo "=== Clonando o repositório TradeFlux ==="
git clone https://github.com/DinizSptech/TradeFlux.git

echo "=== Script finalizado com sucesso! ==="

# Agr só dar esse comando aqui ó:
# cd /tradeflux && npm run dev  