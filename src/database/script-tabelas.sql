CREATE DATABASE allset;
USE allset;

CREATE TABLE Empresa (
    idEmpresa INT AUTO_INCREMENT PRIMARY KEY,
    razaoSocial VARCHAR(255) NOT NULL,
    cnpj CHAR(14) NOT NULL UNIQUE,
    dtCadastro DATE NOT NULL
);

CREATE TABLE Unidade (
    idUnidade INT AUTO_INCREMENT PRIMARY KEY,
    fkEmpresa INT NOT NULL,
    nome VARCHAR(45) NOT NULL,
    logradouro VARCHAR(45),
    numero VARCHAR(10),
    bairro VARCHAR(45),
    cidade VARCHAR(45),
    estado CHAR(2),
    contato CHAR(11),
    FOREIGN KEY (fkEmpresa) REFERENCES Empresa(idEmpresa) ON DELETE CASCADE
    -- Quando é apagado o pai, é apagado junt0 por conta do delete cascade 
);

CREATE TABLE Usuario (
    idUsuario INT AUTO_INCREMENT PRIMARY KEY,
    fkUnidade INT NOT NULL,
    nome VARCHAR(255) NOT NULL,
    cpf CHAR(11) NOT NULL UNIQUE,
    email VARCHAR(255) NOT NULL UNIQUE,
    senha VARCHAR(255) NOT NULL,
    nvl_administrativo TINYINT NOT NULL,
    ativo TINYINT(1) NOT NULL DEFAULT 1,
    FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade) ON DELETE CASCADE
);

CREATE TABLE Carro (
    idCarro INT AUTO_INCREMENT PRIMARY KEY,
    fkUnidade INT NOT NULL,
    modelo VARCHAR(45) NOT NULL,
    marca VARCHAR(45) NOT NULL,
    ano YEAR NOT NULL,
    enderecoMac CHAR(12) NOT NULL UNIQUE,
    sistemaOperacional VARCHAR(10),
    ipv4 VARCHAR
    FOREIGN KEY (fkUnidade) REFERENCES Unidade(idUnidade) ON DELETE CASCADE
);

CREATE TABLE Componente (
    idComponente INT AUTO_INCREMENT PRIMARY KEY,
    nome VARCHAR(45) NOT NULL,
    medida CHAR(2) NOT NULL
);

CREATE TABLE Configuracao (
    idConfiguracao INT AUTO_INCREMENT PRIMARY KEY,
    fkCarro INT NOT NULL,
    fkComponente INT NOT NULL,
    valorLimiteAlerta DOUBLE NOT NULL,
    FOREIGN KEY (fkCarro) REFERENCES Carro(idCarro) ON DELETE CASCADE,
    FOREIGN KEY (fkComponente) REFERENCES Componente(idComponente) ON DELETE CASCADE
);

CREATE TABLE Leitura (
    idLeitura INT AUTO_INCREMENT PRIMARY KEY,
    fkConfiguracao INT NOT NULL,
    dataHora DATETIME NOT NULL,
    valor DOUBLE NOT NULL,
    FOREIGN KEY (fkConfiguracao) REFERENCES Configuracao(idConfiguracao) ON DELETE CASCADE
);

INSERT INTO Empresa (idEmpresa, razaoSocial, cnpj, dtCadastro)
VALUES (DEFAULT, 'Empresa Exemplo Ltda', '12.345.678/0001-99', '2023-04-07');

select * from unidade;
select * from usuario;
select * from empresa;

