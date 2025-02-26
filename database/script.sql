DROP DATABASE IF EXISTS TradeFlux;
CREATE DATABASE IF NOT EXISTS TradeFlux;

USE TradeFlux;

CREATE TABLE Company(
    idCompany INT AUTO_INCREMENT PRIMARY KEY,
    CorporateReason VARCHAR(100) NOT NULL,
    cnpj CHAR(14) UNIQUE NOT NULL,
    phone CHAR(11),
    postalCode CHAR(8),
    number INT
);

CREATE TABLE User(
    idUser INT AUTO_INCREMENT,
    userName VARCHAR(50),
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    userType ENUM('admin', 'analist', 'cientist'),
    admin INT,
    idCompany INT,
    FOREIGN KEY (admin) REFERENCES user(idUser),
    FOREIGN KEY (idCompany) REFERENCES Company(idCompany),
    PRIMARY KEY (idUser, idCompany)
);

INSERT INTO Company (CorporateReason, cnpj) VALUES('empresaTeste', '22222222222222');
INSERT INTO User (userName, password, idCompany, email) VALUES('teste', 'teste2024', 1, 'teste@teste.com');

CREATE TABLE Machine(
    idMachine INT AUTO_INCREMENT PRIMARY KEY,
    machineName VARCHAR(100) NOT NULL,
    motherboardUUID VARCHAR(45) NOT NULL,
    processor VARCHAR(100) NOT NULL,
    disk FLOAT NOT NULL,
    ram FLOAT NOT NULL,
    os VARCHAR(100),
    idCompany INT,
    FOREIGN KEY (idCompany) REFERENCES Company(idCompany)
);

CREATE TABLE data(
    idData INT AUTO_INCREMENT,
    cpuUsage FLOAT,
    ramUsage FLOAT,
    diskUsage FLOAT,
    dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    idMachine INT,
    FOREIGN KEY (idMachine) REFERENCES Machine(idMachine),
    PRIMARY KEY (idData, idMachine)
);

CREATE TABLE Alert(
    idAlert INT AUTO_INCREMENT,
    cpuUsage FLOAT,
    ramUsage FLOAT,
    diskUsage FLOAT,
    dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    idMachine INT,
    FOREIGN KEY (idMachine) REFERENCES Machine(idMachine),
    PRIMARY KEY (idAlert, idMachine)
);

SELECT * from machine;


