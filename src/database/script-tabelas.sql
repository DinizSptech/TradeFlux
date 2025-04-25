-- Banco de dados Frio:

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

CREATE TABLE IF NOT EXISTS Usuario_Cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cargo VARCHAR(45),
    ativo TINYINT(1),
    fk_cliente INT,
    CONSTRAINT fk_usuario_cliente FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente)
);

CREATE TABLE IF NOT EXISTS Data_Center (
    idData_Center INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fk_cliente INT,
    fk_endereco INT,
    CONSTRAINT fk_datacenter_cliente FOREIGN KEY (fk_cliente) REFERENCES Empresa_Cliente(idCliente),
    CONSTRAINT fk_datacenter_endereco FOREIGN KEY (fk_endereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Servidor_Cliente (
    idServidor INT AUTO_INCREMENT PRIMARY KEY,
    UUIDServidor VARCHAR(70),
    ramTotal DOUBLE,
    discoTotal DOUBLE,
    cpuInfo varchar(30),
	fk_data_center INT,
    CONSTRAINT fk_servidor_datacenter FOREIGN KEY (fk_data_center) REFERENCES Data_Center(idData_Center)
);

-- alter table servidor_cliente auto_increment = 1;
--  select * from servidor_cliente;

CREATE TABLE IF NOT EXISTS Parametros_Servidor (
    idParametros_Servidor INT AUTO_INCREMENT PRIMARY KEY,
    componente VARCHAR(45),
    unidade_medida CHAR(2),
    limiar_alerta DOUBLE,
    fk_Servidor_Cliente INT,
    CONSTRAINT fk_parametros_servidor FOREIGN KEY (fk_Servidor_Cliente) REFERENCES Servidor_Cliente(idServidor)
);  

-- Fim banco de dados Frio

CREATE TABLE IF NOT EXISTS Captura (
    idCaptura INT AUTO_INCREMENT,
    fkParametro INT,
    dado DECIMAL(10,2),
    PRIMARY KEY (idCaptura, fkParametro),
    CONSTRAINT ParametroServidor FOREIGN KEY (fkParametro) REFERENCES Parametros_Servidor(idParametros_Servidor)
);

INSERT INTO Endereco VALUES
(default, "03191110", "Rua Dr Álvaro Alvim", 267, "Vila Mariana", "São Paulo", "SP");

INSERT INTO Empresa_Cliente VALUES
(default, "B3 S.A Brasil Bolsa Balcão", "09346601000125","11982482787",1);

-- INSERT INTO Data_Center VALUES
-- (default,"Datacenter SP - Norte", 1,1);

-- INSERT INTO  usuario_cliente VALUES
-- (default, "Mateus Diniz Leite", "mateusdiniz@gmail.com","Tradeflux123@", "administrador", "1", 1);

-- INSERT INTO servidor_cliente VALUES
-- ("58BF840C-561B-DA4B-8E16-706979ACA50B", 16.0, 489.7, "Intel i7-12312",1);

select * from servidor_cliente;

-- SELECT * FROM usuario_cliente WHERE fk_Cliente = 1##SUBSTITUIR PELO ID DA EMPRESA;##
-- ;

-- SELECT * FROM empresa_cliente as ec
-- JOIN data_center as dc ON ec.idCliente = dc.fk_cliente
-- JOIN servidor_cliente as sc ON dc.idData_Center = sc.fk_data_center;

INSERT INTO Parametro_Servidor (limiar_alerta, fkServidor, fkComponente) VALUES
(80.0, 1, 1),
(2.30, 1, 2),
(80.0, 1, 3),
(6.0, 1, 4),
(80.0, 1, 5),
(200.0, 1, 6);

select 

SELECT * FROM empresa_cliente;

SELECT * FROM data_center;
SELECT * FROM endereco
