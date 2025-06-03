#!/bin/bash

# Pra rodar é a msm história do NodeJS:
# nano install_docker.sh
# Aí vc copia tudo que tá aqui e dá o comando abaixo:
# chmod +x install_docker.sh && sudo ./install_docker.sh

# Esse é o Instalador do Professor Edu com mais um teco de coisas

# adicionando as chaves GPG (GNU Privacy Guard) do docker
sudo apt-get update
sudo apt-get install ca-certificates curl -y
sudo install -m 0755 -d /etc/apt/keyrings
sudo curl -fsSL https://download.docker.com/linux/ubuntu/gpg -o /etc/apt/keyrings/docker.asc
sudo chmod a+r /etc/apt/keyrings/docker.asc

# adicionando o repositório do docker como fontes do APT
echo \
  "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/docker.asc] https://download.docker.com/linux/ubuntu \
  $(. /etc/os-release && echo "$VERSION_CODENAME") stable" | \
  sudo tee /etc/apt/sources.list.d/docker.list > /dev/null
sudo apt-get update

# instalando as últimas versões
sudo apt-get install docker-ce docker-ce-cli containerd.io docker-buildx-plugin docker-compose-plugin -y

# adicionando o usuário no grupo docker para não precisar mais do sudo
sudo usermod -aG docker $USER 
newgrp docker

# Baixar o ngrok
wget https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-linux-amd64.tgz

# Extrair
tar xvzf ngrok-v3-stable-linux-amd64.tgz

# Mover para diretório do sistema
sudo mv ngrok /usr/local/bin

# Criar docker-compose.yml
cat <<EOF > docker-compose.yml
services:
  site:
    image: robert1730/nodedockerwebdataviz:1.1
    ports:
      - "8080:8080"
    networks:
      - rede-compose
    depends_on:
      - db
  db:
    image: robert1730/bddocker:1.1
    ports:
      - "1730:3306"
    networks:
      - rede-compose
networks:
  rede-compose:
    driver: bridge
EOF

# Levantando os contâiners 
sudo docker compose up

# Pra rodar, msm padrão de sempre:

# nano install_docker.sh && chmod +x install_docker.sh
# ./install_docker.sh