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
    uf CHAR(2)
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

INSERT INTO Data_Center (nome, fk_cliente, fk_endereco) VALUES
('Data Center B3', 1, 2);

CREATE TABLE IF NOT EXISTS Usuario_Cliente (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45),
    email VARCHAR(45),
    senha VARCHAR(100),
    cargo VARCHAR(45),
    ativo TINYINT,
    fkDataCenter INT,
    FOREIGN KEY (fkDataCenter) REFERENCES Data_Center(idData_Center)
);

INSERT INTO Usuario_Cliente (nome, email, senha, cargo, ativo, fkDataCenter) VALUES 
('Jennifer Silva', 'jennifer.silva@b3.com.br', 'Jennifer123@', 'administrador', 1, 1);

CREATE TABLE IF NOT EXISTS Componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nomeComponente VARCHAR(45),
    medida VARCHAR(45)
);

CREATE TABLE IF NOT EXISTS Servidor_Cliente (
    idServidor INT AUTO_INCREMENT PRIMARY KEY,
    UUID VARCHAR(45),
    sistemaOperacional VARCHAR(45),
    discoTotal DOUBLE,
    ramTotal DOUBLE,
    processadorInfo VARCHAR(45),
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

CREATE TABLE IF NOT EXISTS Captura (
    idCaptura INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
    alerta TINYINT,
    fkParametro INT,
    FOREIGN KEY (fkParametro) REFERENCES Parametro_Servidor(idParametros_Servidor)
);

CREATE TABLE IF NOT EXISTS Alerta (
    idAlerta INT AUTO_INCREMENT PRIMARY KEY,
    valor DOUBLE,
    medida VARCHAR(45),
    data DATETIME,
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

CREATE TRIGGER gatilho_insert_alerta
AFTER INSERT ON Captura
FOR EACH ROW
BEGIN
    IF NEW.alerta = 1 THEN
        INSERT INTO Alerta (valor, medida, data, fkParametro)
        VALUES (NEW.valor, NEW.medida, NEW.data, NEW.fkParametro);
    END IF;
END;

#teste de inserção de servidor, componente, parametro e captura
-- INSERT INTO Servidor_Cliente (UUID, sistemaOperacional, discoTotal, ramTotal, processadorInfo, fkDataCenter) VALUES ('123456789', 'Windows Server 2019', 1000.0, 32.0, 'Intel Xeon', 1);
-- INSERT INTO Componente (nomeComponente, medida) VALUES 
-- ('CPU', '%'), ('RAM', 'GB'), ('DISCO', 'GB');
-- INSERT INTO Parametro_Servidor (limiar_alerta, fkServidor, fkComponente) VALUES (80.0, 1, 1), (25.0, 1, 2), (800.0, 1, 3);
-- select * from parametro_servidor;
-- INSERT INTO Captura (valor, medida, data, alerta, fkParametro) VALUES 
-- (85.0, '%', NOW(), 1, 1), (20.0, 'GB', NOW(), 0, 2), (900.0, 'GB', NOW(), 1, 3);
-- INSERT INTO alerta_visualizado (Usuario_Cliente_idUsuario, Alerta_idAlerta, confirmacao) VALUES (1, 1, 0);
-- select * from alerta;
#ta funcionando


DROP USER IF EXISTS 'user_insert_tradeflux'@'localhost';
CREATE USER 'user_insert_tradeflux'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tradeflux_insert';
GRANT INSERT ON tradeflux.* TO 'user_insert_tradeflux'@'localhost';

DROP USER IF EXISTS 'user_select_tradeflux'@'localhost';
CREATE USER 'user_select_tradeflux'@'localhost' IDENTIFIED WITH mysql_native_password BY 'tradeflux_select';
GRANT SELECT ON tradeflux.* TO 'user_select_tradeflux'@'localhost';

FLUSH PRIVILEGES;
