
DROP DATABASE IF EXISTS tradefluxFrio;
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

FLUSH PRIVILEGES;