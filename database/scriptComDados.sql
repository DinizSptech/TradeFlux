-- NOVO SCRIPT SQL 

show tables;

CREATE DATABASE IF NOT EXISTS tradeflux;
use tradeflux;

CREATE TABLE IF NOT EXISTS Endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep CHAR(8),
    logradouro VARCHAR(100),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    uf CHAR(2)
);

CREATE TABLE IF NOT EXISTS Empresa_Cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100),
    cnpj CHAR(14),
    telefone VARCHAR(12),
    fk_endereco INT,
    CONSTRAINT fk_empresa_endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Data_Center (
    idData_Center INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fk_cliente INT,
    fk_endereco INT,
    CONSTRAINT fk_datacenter_cliente FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente),
    CONSTRAINT fk_datacenter_endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Usuario_Cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cargo VARCHAR(45),
    ativo TINYINT(1),
    fk_cliente INT,
    fkData_Center INT,
    CONSTRAINT fk_usuario_cliente FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente),
    CONSTRAINT fk_user_datacenter FOREIGN KEY (fkData_Center) REFERENCES Data_Center(idData_Center)
);

CREATE TABLE IF NOT EXISTS Servidor_Cliente (
    idServidor int primary key auto_increment,
    UUIDServidor VARCHAR(70) UNIQUE,
    ramTotal INT,
    discoTotal DOUBLE,
    cpuInfo varchar(30),
	fk_data_center INT,
    CONSTRAINT fk_servidor_datacenter FOREIGN KEY (fk_data_center) REFERENCES Data_Center(idData_Center)
);

CREATE TABLE IF NOT EXISTS Componente(
idComponente int primary key auto_increment,
componente varchar(45),
medida char(2)
);

CREATE TABLE IF NOT EXISTS Configuracao_Servidor (
    idConfiguracao_Servidor INT AUTO_INCREMENT PRIMARY KEY,
    limiar_alerta DOUBLE,
    fk_Servidor INT,
    fk_Componente INT not null,
    CONSTRAINT fk_config_servidor FOREIGN KEY (fk_Servidor) REFERENCES Servidor_Cliente(idServidor),
    CONSTRAINT fk_config_componente FOREIGN KEY (fk_Componente) REFERENCES Componente(idComponente)
);

CREATE TABLE IF NOT EXISTS Captura (
    idCaptura INT AUTO_INCREMENT,
    valor DOUBLE,
    datahora DATETIME,
    fkConfiguracao INT,
    PRIMARY KEY (idCaptura, fkConfiguracao),
    CONSTRAINT fk_captura_config FOREIGN KEY (fkConfiguracao) REFERENCES Configuracao_Servidor(idConfiguracao_Servidor)
);

CREATE TABLE IF NOT EXISTS Alerta (
    idAlerta INT AUTO_INCREMENT,
    valor DOUBLE,
    datahora DATETIME,
    fkConfiguracao INT,
    PRIMARY KEY (idAlerta, fkConfiguracao),
    CONSTRAINT fk_alerta_config FOREIGN KEY (fkConfiguracao) REFERENCES Configuracao_Servidor(idConfiguracao_Servidor)
);

CREATE TABLE IF NOT EXISTS Processos_Captura (
	idProcesso INT auto_increment,
    nomeProcesso VARCHAR(45),
    usoRAM DOUBLE,
    usoCPU DOUBLE,
    usoDisco DOUBLE,
    fkCaptura INT,
    PRIMARY KEY (idProcesso, fkCaptura),
    CONSTRAINT fk_processos_captura FOREIGN KEY (fkCaptura) REFERENCES Captura(idCaptura)
);

CREATE TABLE IF NOT EXISTS Processos_Alerta (
	idProcesso INT auto_increment,
    nomeProcesso VARCHAR(45),
    usoRAM DOUBLE,
    usoCPU DOUBLE,
    usoDisco DOUBLE,
    fkAlerta INT,
    PRIMARY KEY (idProcesso, fkAlerta),
    CONSTRAINT fk_processos_alerta FOREIGN KEY (fkAlerta) REFERENCES Alerta(idAlerta)
);


INSERT INTO Endereco VALUES
(default, "04538000", "Av. Brigadeiro Faria Lima", 1500, "Itaim Bibi", "São Paulo", "SP"),
(default, "20040002", "Rua da Assembleia", 100, "Centro", "Rio de Janeiro", "RJ");


INSERT INTO Empresa_Cliente VALUES
(default, "B3 S.A Brasil Bolsa Balcão", "09346601000125","11982482787",1);

INSERT INTO Data_Center VALUES
(default,"b3 Data center Norte SP", 1,1),
(default, "B3 Data Center Rio", 1, 2);

INSERT INTO  usuario_cliente VALUES
(default, "Mateus Diniz Leite", "mateusdiniz@gmail.com","Tradeflux123@", "administrador", 1, 1,1),
(default, "Ana Paula Ferreira", "ana.paula@xp.com", "senhaForte123!", "analista", 1, 1,2),
(default, "Carlos Andrade", "c.andrade@petrobras.com", "SenhaSegura456!", "cientista", 1,1,2
);


INSERT INTO servidor_cliente VALUES
(default,"58BF840C-561B-DA4B-8E16-706979ACA50B", 16.0, 489.7, "Intel i7-12312",1),
(default, "A2B7C7A0-8F1E-44E2-9F53-TESTE1", 32.0, 1000.0, "AMD Ryzen 9", 2),
(default, "B4C9D1B3-3F2A-48B5-9F72-TESTE2", 64.0, 2000.0, "Intel Xeon Gold", 1
);

INSERT INTO Componentes VALUES
(default, "CPU", "%"),
(default, "RAM", "%"),
(default, "Disco", "%");

INSERT INTO Parametros_Servidor VALUES
(default, 85.0, 1, 1),
(default, 90.0, 1, 2),
(default, 80.0, 1, 3),
(default, 85.0, 2, 1),
(default, 90.0, 2, 2),
(default, 80.0, 2, 3);

INSERT INTO Captura VALUES
(default, 1, 72.5),
(default, 2, 65.3),
(default, 3, 79.1),
(default, 4, 60.2),
(default, 5, 70.4),
(default, 6, 81.9);

SELECT * FROM captura as c JOIN Parametros_servidor as p ON c.fkParametro = p.idParametro_Servidor;

select * from servidor_cliente;

SELECT * FROM usuario_cliente WHERE fk_Cliente = 1##SUBSTITUIR PELO ID DA EMPRESA;##
;

DROP DATABASE tradeflux;

SELECT * FROM empresa_cliente as ec
JOIN data_center as dc ON ec.idCliente = dc.fk_cliente
JOIN servidor_cliente as sc ON dc.idData_Center = sc.fk_data_center;

SELECT * FROM empresa_cliente;

SELECT * FROM data_center;



