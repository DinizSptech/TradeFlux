-- Banco de dados Frio:

DROP DATABASE IF EXISTS tradeflux;
CREATE DATABASE tradeflux;
USE tradeflux;

-- UPDATE mysql.user set Host='%' WHERE User='root' AND Host='localhost';

CREATE TABLE IF NOT EXISTS endereco (
    idEndereco INT AUTO_INCREMENT PRIMARY KEY,
    cep CHAR(8),
    logradouro VARCHAR(100),
    numero INT,
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    uf CHAR(2),
    complemento VARCHAR(45)
);

INSERT INTO endereco (cep, logradouro, numero, bairro, cidade, uf) VALUES
('01310100', 'Praça Antonio Prado', 48, 'Centro', 'São Paulo', 'SP'),
('06543004', 'Rua Ricardo Prudente de Aquino', 85, 'Alphaville', 'Santana de Parnaíba', 'SP');

CREATE TABLE IF NOT EXISTS empresa_cliente (
    idCliente INT AUTO_INCREMENT PRIMARY KEY,
    razao_social VARCHAR(100),
    cnpj CHAR(14) UNIQUE,
    telefone VARCHAR(12),
    fk_endereco INT,
    FOREIGN KEY (fk_endereco) REFERENCES endereco(idEndereco)
);

INSERT INTO empresa_cliente (razao_social, cnpj, telefone, fk_endereco) VALUES
('B3 Bolsa, Brasil, Balcão S.A.', '03365836000124', '1132121234', 1);

CREATE TABLE IF NOT EXISTS data_center (
    idData_Center INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    fk_cliente INT,
    fk_endereco INT,
    FOREIGN KEY (fk_cliente) REFERENCES empresa_cliente(idCliente),
    FOREIGN KEY (fk_endereco) REFERENCES endereco(idEndereco)
);

SELECT * FROM data_center;

INSERT INTO data_center (nome, fk_cliente, fk_endereco) VALUES
('Data Center B3', 1, 2);

CREATE TABLE IF NOT EXISTS usuario_cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45) UNIQUE,
    senha VARCHAR(200), 
    cargo VARCHAR(45),
    ativo TINYINT,
    acesso TIME,
    fkDataCenter INT,
    FOREIGN KEY (fkDataCenter) REFERENCES data_center(idData_Center)
);

INSERT INTO usuario_cliente (nome, email, senha, cargo, ativo, acesso, fkDataCenter) VALUES 
('Jennifer Silva', 'jennifer.silva@b3.com.br', 'c89f6b6d56d9ce4c81489ea96082757a:14fb486a60bb1652636764bd4d3d36315fbc6d377cb0165e54aa80d7fea87e7a', 'administrador', 1, curtime(), 1),
('Victor Santos', 'victor.santos@b3.com.br', 'Senha123@','cientista','0',curtime(),'1');

CREATE TABLE IF NOT EXISTS componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nomeComponente VARCHAR(45),
    medida VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS servidor_cliente (
    idServidor INT AUTO_INCREMENT PRIMARY KEY,
    uuidServidor VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    discoTotal VARCHAR(45),
    ramTotal VARCHAR(45),
    processadorInfo VARCHAR(60),
    fkDataCenter INT,
    FOREIGN KEY (fkDataCenter) REFERENCES data_center(idData_Center)
);

CREATE TABLE IF NOT EXISTS parametro_servidor (
    idParametros_Servidor INT AUTO_INCREMENT PRIMARY KEY,
    limiar_alerta DOUBLE,
    fkServidor INT,
    fkComponente INT,
    FOREIGN KEY (fkComponente) REFERENCES componente(idComponente)
);  

-- DROP USER IF EXISTS 'user_insert_tradeflux'@'%';
-- CREATE USER 'user_insert_tradeflux'@'%' IDENTIFIED BY 'tradeflux_insert';
-- GRANT INSERT,UPDATE ON tradeflux.* TO 'user_insert_tradeflux'@'%'; 

-- DROP USER IF EXISTS 'user_select_tradeflux'@'%';
-- CREATE USER 'user_select_tradeflux'@'%' IDENTIFIED BY 'tradeflux_select';
-- GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'%';

-- FLUSH PRIVILEGES;

-- Fim frio

-- CREATE TABLE IF NOT EXISTS captura (
--     idCaptura INT AUTO_INCREMENT PRIMARY KEY,
--     valor DOUBLE,
--     medida VARCHAR(45),
--     data DATETIME,
--     alerta TINYINT,
--     fkParametro INT,
--     FOREIGN KEY (fkParametro) REFERENCES parametro_servidor(idParametros_Servidor)
-- );
-- select* from captura;

CREATE TABLE IF NOT EXISTS alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
    criticidade TINYINT,
    fkParametro INT,
    FOREIGN KEY (fkParametro) REFERENCES parametro_servidor(idParametros_Servidor)
);

CREATE TABLE IF NOT EXISTS alerta_visualizado (
    Usuario_Cliente_idUsuario INT,
    Alerta_idAlerta INT,
    confirmacao TINYINT,
    PRIMARY KEY (Usuario_Cliente_idUsuario, Alerta_idAlerta),
    FOREIGN KEY (Usuario_Cliente_idUsuario) REFERENCES usuario_cliente(idUsuario),
    FOREIGN KEY (Alerta_idAlerta) REFERENCES alerta(idAlerta)
);

-- DROP TRIGGER IF EXISTS gatilho_insert_alerta;

-- DELIMITER $$


-- CREATE TRIGGER gatilho_insert_alerta
-- AFTER INSERT ON captura
-- FOR EACH ROW
-- BEGIN
--     IF NEW.alerta = 1 OR NEW.alerta = 2 THEN
--         INSERT INTO alerta (valor, medida, data, criticidade ,fkParametro)
--         VALUES (NEW.valor, NEW.medida, NEW.data, NEW.alerta, NEW.fkParametro);
--     END IF;
-- END$$
-- DELIMITER;

DROP USER IF EXISTS 'user_insert_tradeflux'@'%';
CREATE USER 'user_insert_tradeflux'@'%' IDENTIFIED BY 'tradeflux_insert';
GRANT INSERT,UPDATE ON tradeflux.* TO 'user_insert_tradeflux'@'%'; 

DROP USER IF EXISTS 'user_select_tradeflux'@'%';
CREATE USER 'user_select_tradeflux'@'%' IDENTIFIED BY 'tradeflux_select';
GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'%';

FLUSH PRIVILEGES;
INSERT INTO servidor_cliente VALUES
(default, "A2B7C7A0-8F1E-44E2-9F53-TESTE1", "Linux", 1000.0, 64.0, "AMD Ryzen 9", 1),
(default, "B4C9D1B3-3F2A-48B5-9F72-TESTE2", "Windowns", 2000.0, 32.0, "Intel Xeon Gold", 1
);
-- deixar componentes chumbados
INSERT INTO componente (nomeComponente, medida) VALUES 
('Cpu_Percentual', '%'), 
('Cpu_Frequencia',  'GHz'),
('Ram_Percentual', '%'),
('Ram_Usada', 'GB'),
('Disco_Percentual', '%'),
('Disco_Usado', 'GB'),
('Velocidade Download','KB/s'),
('Velocidade Upload','KB/s');

-- precisa inserir isso após a api cadastrar o servidor
INSERT INTO parametro_servidor (limiar_alerta, fkServidor, fkComponente) VALUES 
(80.0, 1, 1), 
(2.30, 1, 2),
(80.0, 1, 3),
(6.0, 1, 4),
(80.0, 1, 5),
(200.0, 1, 6),
(80.0, 0, 1),
(80.0, 0, 3),
(80.0, 0, 5),
(100, 0, 7),
(100, 0, 8);

create or replace view vw_dashUsuarios as
select u.nome,u.email,u.cargo,u.ativo,u.acesso from usuario_cliente as u
join data_center as dc
on u.fkDataCenter = dc.idData_Center;