-- Banco de dados Frio:

DROP DATABASE IF EXISTS tradeflux;
CREATE DATABASE tradeflux;
USE tradeflux;

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
    acesso TIME,
    fkDataCenter INT,
    FOREIGN KEY (fkDataCenter) REFERENCES Data_Center(idData_Center)
);

INSERT INTO Usuario_Cliente (nome, email, senha, cargo, ativo, acesso, fkDataCenter) VALUES 
('Jennifer Silva', 'jennifer.silva@b3.com.br', 'c89f6b6d56d9ce4c81489ea96082757a:14fb486a60bb1652636764bd4d3d36315fbc6d377cb0165e54aa80d7fea87e7a', 'administrador', 1, curtime(), 1),
('Victor Santos', 'victor.santos@b3.com.br', 'Senha123@','cientista','0',curtime(),'1');

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

-- DROP USER IF EXISTS 'user_insert_tradeflux'@'%';
-- CREATE USER 'user_insert_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_insert';
-- GRANT INSERT,UPDATE ON tradeflux.* TO 'user_insert_tradeflux'@'%'; 

-- DROP USER IF EXISTS 'user_select_tradeflux'@'%';
-- CREATE USER 'user_select_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_select';
-- GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'%';

FLUSH PRIVILEGES;

-- Fim frio

CREATE TABLE IF NOT EXISTS Captura (
    idCaptura INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
    alerta TINYINT,
    fkParametro INT,
    FOREIGN KEY (fkParametro) REFERENCES Parametro_Servidor(idParametros_Servidor)
);
select* from captura;
CREATE TABLE IF NOT EXISTS Alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
    criticidade TINYINT,
    fkParametro INT,
    FOREIGN KEY (fkParametro) REFERENCES Parametro_Servidor(idParametros_Servidor)
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

/*
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
*/
DROP USER IF EXISTS 'user_insert_tradeflux'@'%';
CREATE USER 'user_insert_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_insert';
GRANT INSERT,UPDATE ON tradeflux.* TO 'user_insert_tradeflux'@'%'; 

DROP USER IF EXISTS 'user_select_tradeflux'@'%';
CREATE USER 'user_select_tradeflux'@'%' IDENTIFIED WITH mysql_native_password BY 'tradeflux_select';
GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'%';

FLUSH PRIVILEGES;

#deixar componentes chumbados
INSERT INTO Componente (nomeComponente, medida) VALUES 
('Cpu_Percentual', '%'), 
('Cpu_Frequencia',  'GHz'),
('Ram_Percentual', '%'),
('Ram_Usada', 'GB'),
('Disco_Percentual', '%'),
('Disco_Usado', 'GB');

#precisa inserir isso apos a api cadastrar o servidor
-- INSERT INTO Parametro_Servidor (limiar_alerta, fkServidor, fkComponente) VALUES 
-- (80.0, 1, 1), 
-- (2.30, 1, 2),
-- (80.0, 1, 3),
-- (6.0, 1, 4),
-- (80.0, 1, 5),
-- (200.0, 1, 6);

-- View para ver o status do Data Center
-- create view vw_statusDataCenter as
-- select alerta from captura as c
-- join parametro_servidor as p
-- on c.fkParametro = p.idParametros_Servidor
-- join servidor_cliente as s
-- on p.fkServidor = s.idServidor
-- join data_center as dc
-- on s.fkDataCenter = dc.idData_Center;

-- View final para a dashboard gerente Data Center (é o JSON)
-- create view vw_dashDataCenter as
-- select
-- (select idData_Center from data_center) as idDataCenter,
-- (select nome from data_center) as nomeDataCenter,
-- (select * from vw_servidoresCadastrados) as servidoresCadastrados,
-- (select * from vw_statusDataCenter) as statusDataCenter;

-- select * from vw_dashDataCenter;
-- drop view vw_dashDataCenter;






