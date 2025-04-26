#!/bin/bash

# Essa é a função para criar os arquivos Mysql

# Pra rodar é a msm história do NodeJS:

# nano utilizando_docker.sh
# Aí vc copia tudo que tá aqui e dá o comando abaixo:
# chmod +x utilizando_docker.sh && sudo ./utilizando_docker.sh

criacaoBDs() {

echo "=== Criando os Arquivos SQL ==="

bdFrio="DROP DATABASE IF EXISTS tradefluxFrio;
CREATE DATABASE tradefluxFrio;
USE tradefluxFrio;

CREATE TABLE IF NOT EXISTS Endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep CHAR(8),
    logradouro VARCHAR(100),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    uf CHAR(2),
    complemento VARCHAR(45)
);

INSERT INTO Endereco (cep, logradouro, numero, bairro, cidade, uf) VALUES
('01310100', 'Praça Antonio Prado', 48, 'Centro', 'São Paulo', 'SP'),
('06543004', 'Rua Ricardo Prudente de Aquino', 85, 'Alphaville', 'Santana de Parnaíba', 'SP');

CREATE TABLE IF NOT EXISTS Empresa_Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100),
    cnpj CHAR(14) UNIQUE,
    telefone VARCHAR(12),
    fk_endereco INT,
    FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);

INSERT INTO Empresa_Cliente (razao_social, cnpj, telefone, fk_endereco) VALUES
('B3 Bolsa, Brasil, Balcão S.A.', '03365836000124', '1132121234', 1);

CREATE TABLE IF NOT EXISTS Data_Center (
    idData_Center INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fk_cliente INT,
    fk_endereco INT,
    FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente),
    FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);

SELECT * FROM Data_Center;

INSERT INTO Data_Center (nome, fk_cliente, fk_endereco) VALUES
('Data Center B3', 1, 2);

CREATE TABLE IF NOT EXISTS Usuario_Cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(200),
    cargo VARCHAR(45),
    ativo TINYINT,
    fkDataCenter INT,
    FOREIGN KEY (fkDataCenter) REFERENCES Data_Center(idData_Center)
);

INSERT INTO Usuario_Cliente (nome, email, senha, cargo, ativo, fkDataCenter) VALUES 
('Jennifer Silva', 'jennifer.silva@b3.com.br', 'c89f6b6d56d9ce4c81489ea96082757a:14fb486a60bb1652636764bd4d3d36315fbc6d377cb0165e54aa80d7fea87e7a', 'administrador', 1, 1);

CREATE TABLE IF NOT EXISTS Componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nomeComponente VARCHAR(45),
    medida VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Servidor_Cliente (
    idServidor INT AUTO_INCREMENT PRIMARY KEY,
    uuidServidor VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    discoTotal VARCHAR(45),
    ramTotal VARCHAR(45),
    processadorInfo VARCHAR(60),
    fkDataCenter INT,
    FOREIGN KEY (fkDataCenter) REFERENCES Data_Center(idData_Center)
);

CREATE TABLE IF NOT EXISTS Parametro_Servidor (
    idParametros_Servidor INT AUTO_INCREMENT PRIMARY KEY,
    limiar_alerta DOUBLE,
    fkServidor INT,
    fkComponente INT,
    FOREIGN KEY (fkServidor) REFERENCES Servidor_Cliente(idServidor),
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);


DROP USER IF EXISTS 'user_insert_tradeflux'@'%';
CREATE USER 'user_insert_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_insert';
GRANT INSERT,UPDATE ON tradeflux.* TO 'user_insert_tradeflux'@'%'; 

DROP USER IF EXISTS 'user_select_tradeflux'@'%';
CREATE USER 'user_select_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_select';
GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'%';

FLUSH PRIVILEGES;"

bdQuente="DROP DATABASE IF EXISTS tradefluxQuente;
CREATE DATABASE tradefluxQuente;
USE tradefluxQuente;

CREATE TABLE IF NOT EXISTS Captura (
    idCaptura INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
    alerta TINYINT,
    fkParametro INT,
    -- FOREIGN KEY (fkParametro) REFERENCES Parametro_Servidor(idParametros_Servidor)
);
select* from captura;
CREATE TABLE IF NOT EXISTS Alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
    criticidade TINYINT,
    fkParametro INT,
    -- FOREIGN KEY (fkParametro) REFERENCES Parametro_Servidor(idParametros_Servidor)
);

CREATE TABLE IF NOT EXISTS alerta_visualizado (
    Usuario_Cliente_idUsuario INT,
    Alerta_idAlerta INT,
    confirmacao TINYINT,
    PRIMARY KEY (Usuario_Cliente_idUsuario, Alerta_idAlerta),
    FOREIGN KEY (Usuario_Cliente_idUsuario) REFERENCES Usuario_Cliente(idUsuario),
    FOREIGN KEY (Alerta_idAlerta) REFERENCES Alerta(idAlerta)
);

DROP TRIGGER IF EXISTS gatilho_insert_alerta;

DELIMITER $$

CREATE TRIGGER gatilho_insert_alerta
AFTER INSERT ON Captura
FOR EACH ROW
BEGIN
    IF NEW.alerta = 1 OR NEW.alerta = 2 THEN
        INSERT INTO Alerta (valor, medida, data, criticidade ,fkParametro)
        VALUES (NEW.valor, NEW.medida, NEW.data, NEW.alerta, NEW.fkParametro);
    END IF;
END$$
DELIMITER;

DROP USER IF EXISTS 'user_insert_tradeflux'@'%';
CREATE USER 'user_insert_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_insert';
GRANT INSERT,UPDATE ON tradeflux.* TO 'user_insert_tradeflux'@'%'; 

DROP USER IF EXISTS 'user_select_tradeflux'@'%';
CREATE USER 'user_select_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_select';
GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'%';

FLUSH PRIVILEGES;"

printf "%s\n" "$bdFrio" > bdFrio.sql
printf "%s\n" "$bdQuente" > bdQuente.sql
  
}

echo "=== Ativando e habilitando os Serviços Docker no sistema ==="
sudo systemctl start docker && sudo systemctl enable docker

echo "=== Pegando a "imagem" do MySql ==="
docker pull mysql:8.0.37

echo "=== Criando os Banco de Dados Frio (Porta nova - 1730) e Quente ( Porta nova - 9642) ==="
docker run -d -p 1730:3306 --name databaseFria -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:8.0.37
docker run -d -p 9642:3306 --name databaseQuente -e "MYSQL_ROOT_PASSWORD=urubu100" mysql:8.0.37

echo "=== Verificando se foi criado corretamente: ==="
docker ps

echo "=== Pequeno tempo só para o Mysql iniciar: ==="
sleep 60

criacaoBDs

echo "=== Enviando os BD para os respectivos Dockers: ==="
docker cp bdFrio.sql databaseFria:/bdFrio.sql
docker cp bdQuente.sql databaseQuente:/bdQuente.sql

echo "=== Executando o sql nos respectivos Dockers: ==="
docker exec -i databaseFria bash -c "mysql -uroot -p urubu100 < /bdFrio.sql"
docker exec -i databaseQuente bash -c "mysql -uroot -p urubu100 < /bdQuente.sql"

echo "=== Processo finalizado ==="
