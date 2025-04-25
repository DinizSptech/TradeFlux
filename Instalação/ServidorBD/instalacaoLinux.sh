#!/bin/bash

echo "====================================="
echo " Atualizando pacotes do sistema"
echo "====================================="
sudo apt-get update -y

echo "====================================="
echo " Instalando o MySQL Server"
echo "====================================="
sudo apt-get install mysql-server -y

echo "====================================="
echo " Iniciando e habilitando o MySQL"
echo "====================================="
sudo systemctl start mysql
sudo systemctl enable mysql

echo "====================================="
echo " Criando arquivo temporário .my.cnf com senha do root"
echo "====================================="

cat <<EOF > ~/.my.cnf
[client]
user=root
password=urubu100
EOF

chmod 600 ~/.my.cnf

echo "====================================="
echo " Configurando autenticação do usuário root"
echo "====================================="

sudo mysql -e "ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'urubu100';"
sudo mysql -e "FLUSH PRIVILEGES;"

echo "====================================="
echo " Criando banco de dados e usuários da aplicação"
echo "====================================="
mysql -e "CREATE DATABASE Tradeflux;"
mysql -e "CREATE USER 'tradefluxInsert'@'localhost' IDENTIFIED BY 'Urubu100';"
mysql -e "GRANT INSERT ON Tradeflux.* TO 'tradefluxInsert'@'localhost';"
mysql -e "CREATE USER 'tradefluxSelect'@'localhost' IDENTIFIED BY 'Urubu100';"
mysql -e "GRANT SELECT ON Tradeflux.* TO 'tradefluxSelect'@'localhost';"
mysql -e "FLUSH PRIVILEGES;"

echo "====================================="
echo " Executando script SQL de criação de tabelas"
echo "====================================="
mysql Tradeflux < script-bd.sql

echo "====================================="
echo " Limpando arquivo temporário de senha"
echo "====================================="
rm -f ~/.my.cnf

echo "✅ Processo concluído com sucesso!"
