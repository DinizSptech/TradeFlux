-- NOVO SCRIPT SQL 


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
    fkEndereco INT,
    CONSTRAINT fk_empresa_endereco FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Data_Center (
    idDataCenter INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fkCliente INT,
    fkEndereco INT,
    CONSTRAINT fk_datacenter_cliente FOREIGN KEY (fkCliente) REFERENCES Empresa_Cliente(idCliente),
    CONSTRAINT fk_datacenter_endereco FOREIGN KEY (fkEndereco) REFERENCES Endereco(idEndereco)
);

CREATE TABLE IF NOT EXISTS Usuario_Cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cargo VARCHAR(45),
    ativo TINYINT(1),
    fkCliente INT,
    fkDataCenter INT,
    CONSTRAINT fk_usuario_cliente FOREIGN KEY (fkCliente) REFERENCES Empresa_Cliente(idCliente),
    CONSTRAINT fk_user_datacenter FOREIGN KEY (fkDataCenter) REFERENCES Data_Center(idDataCenter)
);

CREATE TABLE IF NOT EXISTS Servidor_Cliente (
    idServidor int primary key auto_increment,
    UUIDServidor VARCHAR(70) UNIQUE,
    SO varchar(40),
    ramTotal DOUBLE,
    discoTotal DOUBLE,
    cpuInfo varchar(30),
	fkDataCenter INT,
    CONSTRAINT fk_servidor_datacenter FOREIGN KEY (fkDataCenter) REFERENCES Data_Center(idDataCenter)
);

CREATE TABLE IF NOT EXISTS Componente(
idComponente int primary key auto_increment,
componente varchar(45),
medida char(2)
);

CREATE TABLE IF NOT EXISTS Parametro_Servidor (
    idParametro INT AUTO_INCREMENT PRIMARY KEY,
    limiar_alerta DOUBLE,
    fkServidor INT,
    fkComponente int not null,
    CONSTRAINT fk_parametro_servidor FOREIGN KEY (fkServidor) REFERENCES Servidor_Cliente(idServidor),
    CONSTRAINT fk_paramentro_componente FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente)
);  

CREATE TABLE IF NOT EXISTS Captura (
    idCaptura INT AUTO_INCREMENT,
    fkParametro INT,
    dado DECIMAL(10,2),
    PRIMARY KEY (idCaptura, fkParametro),
    CONSTRAINT ParametroServidor FOREIGN KEY (fkParametro) REFERENCES Parametro_Servidor(idParametro)
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
(default,"NBQAZ11001217002E7MO00","windows" , 16.0, 489.7, "Intel i7-12312",1);

INSERT INTO Componente VALUES
(default, "CPU", "%"),
(default, "RAM", "%"),
(default, "Disco", "%");

INSERT INTO Parametro_Servidor VALUES
(default, 85.0, 1, 1),
(default, 90.0, 1, 2),
(default, 80.0, 1, 3);

INSERT INTO Captura VALUES
(default, 1, 72.5),
(default, 2, 65.3),
(default, 3, 79.1);

SELECT * FROM captura as c JOIN Parametro_servidor as p ON c.fkParametro = p.idParametro;

select * from servidor_cliente;

SELECT * FROM usuario_cliente WHERE fk_Cliente = 1##SUBSTITUIR PELO ID DA EMPRESA;##
;

DROP DATABASE tradeflux;

SELECT * FROM empresa_cliente as ec
JOIN data_center as dc ON ec.idCliente = dc.fkCliente
JOIN servidor_cliente as sc ON dc.idDataCenter = sc.fkDataCenter;

SELECT * FROM empresa_cliente;

SELECT * FROM data_center;

select * from Captura JOIN Parametro_Servidor ON fkParametro = idParametro;

select * from parametro_servidor;

select * from servidor_cliente;

SELECT componente, limiar_alerta FROM servidor_cliente 
JOIN parametro_servidor ON idServidor = fkServidor
JOIN componente ON fkComponente = idComponente
WHERE idServidor = 1;



