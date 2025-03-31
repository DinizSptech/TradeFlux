-- Active: 1732573765546@@127.0.0.1@3306@tradeflux
-- NOVO SCRIPT SQL 

CREATE DATABASE tradeflux;
use tradeflux;

CREATE TABLE Endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep CHAR(8),
    logradouro VARCHAR(100),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    uf CHAR(2)
);
INSERT INTO Endereco (cep, logradouro, numero, bairro, cidade, uf) VALUES 
('01010901', 'Rua Quinze de Novembro', 275, 'Centro Histórico de São Paulo', 'São Paulo', 'SP'),
('06543004', 'Rua Ricardo Prudente de Aquino', 85, 'Residencial Tambore III', 'Santana de Parnaíba', 'SP');
CREATE TABLE Empresa_Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100),
    cnpj CHAR(14),
    telefone VARCHAR(12),
    fk_endereco INT,
    CONSTRAINT fk_empresa_endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);
INSERT INTO Empresa_Cliente (razao_social, cnpj, telefone, fk_endereco) VALUES 
(' B3 S.A. Brasil, Bolsa, Balcão', '09346601000125', '11999999999', 1);
SELECT * FROM Usuario_Cliente;
CREATE TABLE Usuario_Cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cargo VARCHAR(45),
    ativo TINYINT(1),
    fk_cliente INT,
    CONSTRAINT fk_usuario_cliente FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente)
);

CREATE TABLE Data_Center (
    idData_Center INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fk_cliente INT,
    fk_endereco INT,
    CONSTRAINT fk_datacenter_cliente FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente),
    CONSTRAINT fk_datacenter_endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);
INSERT INTO Data_Center (nome, fk_cliente, fk_endereco) VALUES 
('Data Center B3', 1, 2);

CREATE TABLE Servidor_Cliente (
    idServidor INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fk_data_center INT,
    CONSTRAINT fk_servidor_datacenter FOREIGN KEY (fk_data_center) REFERENCES Data_Center(idData_Center)
);

CREATE TABLE Parametros_Servidor (
    idParametros_Servidor INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(45),
    unidade_medida CHAR(2),
    limiar_alerta DOUBLE,
    fk_Servidor_Cliente INT,
    CONSTRAINT fk_parametros_servidor FOREIGN KEY (fk_Servidor_Cliente) REFERENCES Servidor_Cliente(idServidor)
);

CREATE TABLE Captura_Servidor_1 (
    idCaptura_Servidor_1 INT AUTO_INCREMENT PRIMARY KEY,
    `CPU_%` INT,
    CPU_Freq DOUBLE,
    `RAM_%` INT,
    RAM_Byte DOUBLE,
    `Disco_%` INT,
    Disco_Byte DOUBLE,
    Rede_Upload_Mbps DOUBLE,
    Rede_Download_Mbps DOUBLE
);

CREATE TABLE Captura_Servidor_2 (
    idCaptura_Servidor_2 INT AUTO_INCREMENT PRIMARY KEY,
    `CPU_%` INT,
    CPU_Freq DOUBLE,
    `RAM_%` INT,
    RAM_Byte DOUBLE,
    `Disco_%` INT,
    Disco_Byte DOUBLE,
    Rede_Upload_Mbps DOUBLE,
    Rede_Download_Mbps DOUBLE
);

CREATE TABLE Captura_Servidor_3 (
    idCaptura_Servidor_3 INT AUTO_INCREMENT PRIMARY KEY,
    `CPU_%` INT,
    CPU_Freq DOUBLE,
    `RAM_%` INT,
    RAM_Byte DOUBLE,
    `Disco_%` INT,
    Disco_Byte DOUBLE,
    Rede_Upload_Mbps DOUBLE,
    Rede_Download_Mbps DOUBLE
);

CREATE TABLE Captura_Servidor_4 (
    idCaptura_Servidor_4 INT AUTO_INCREMENT PRIMARY KEY,
    `CPU_%` INT,
    CPU_Freq DOUBLE,
    `RAM_%` INT,
    RAM_Byte DOUBLE,
    `Disco_%` INT,
    Disco_Byte DOUBLE,
    Rede_Upload_Mbps DOUBLE,
    Rede_Download_Mbps DOUBLE
);

CREATE TABLE Alerta_Servidor_1 (
    idAlerta_Servidor_1 INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(45),
    dado DECIMAL(10,2),
    responsavel VARCHAR(45),
    visualizado TINYINT(1)
);

CREATE TABLE Alerta_Servidor_2 (
    idAlerta_Servidor_2 INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(45),
    dado DECIMAL(10,2),
    responsavel VARCHAR(45),
    visualizado TINYINT(1)
);

CREATE TABLE Alerta_Servidor_3 (
    idAlerta_Servidor_3 INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(45),
    dado DECIMAL(10,2),
    responsavel VARCHAR(45),
    visualizado TINYINT(1)
);

CREATE TABLE Alerta_Servidor_4 (
    idAlerta_Servidor_4 INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(45),
    dado DECIMAL(10,2),
    responsavel VARCHAR(45),
    visualizado TINYINT(1)
);

