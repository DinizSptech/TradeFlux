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

CREATE TABLE Machine(
    idMachine INT AUTO_INCREMENT PRIMARY KEY,
    machineName VARCHAR(100) NOT NULL,
    idCompany INT,
    FOREIGN KEY (idCompany) REFERENCES Company(idCompany)
);

CREATE TABLE Data(
    idData INT AUTO_INCREMENT PRIMARY KEY,
    cpuUsage FLOAT,
    ramUsage FLOAT,
    diskUsage FLOAT,
    dateTime DATETIME DEFAULT CURRENT_TIMESTAMP,
    idMachine INT,
    FOREIGN KEY (idMachine) REFERENCES Machine(idMachine)
);