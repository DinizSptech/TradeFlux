DROP DATABASE IF EXISTS tradefluxQuente;
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

FLUSH PRIVILEGES;