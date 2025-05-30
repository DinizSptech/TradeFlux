-- active: 1732573765546@@127.0.0.1@3306@allset
-- usuarios e privilegios

drop user if exists 'user_insert_tradeflux'@'%';
create user 'user_insert_tradeflux'@'%' identified by 'tradeflux_insert';
grant insert,update on tradeflux.* to 'user_insert_tradeflux'@'%';

drop user if exists 'user_select_tradeflux'@'%';
create user 'user_select_tradeflux'@'%' identified by 'tradeflux_select';
grant select on tradeflux.* to 'user_select_tradeflux'@'%';
-- update mysql.user set host='%' where user='root' and host='localhost';
flush privileges;

drop database if exists tradeflux;
create database if not exists tradeflux;
use tradeflux;

create table if not exists endereco (
    idendereco int auto_increment primary key,
    cep char(8),
    logradouro varchar(100),
    numero int,
    bairro varchar(45),
    cidade varchar(45),
    uf char(2),
    complemento varchar(45)
);

insert into endereco (cep, logradouro, numero, bairro, cidade, uf) values
('01310100', 'praça antonio prado', 48, 'centro', 'são paulo', 'sp'),
('06543004', 'rua ricardo prudente de aquino', 85, 'alphaville', 'santana de parnaíba', 'sp'),
('30140071', 'avenida álvares cabral', 1600, 'lourdes', 'belo horizonte', 'mg'),
('80010000', 'rua marechal deodoro', 630, 'centro', 'curitiba', 'pr');

create table if not exists empresa_cliente (
    idcliente int auto_increment primary key,
    razao_social varchar(100),
    cnpj char(14) unique,
    telefone varchar(12),
    fk_endereco int,
    foreign key (fk_endereco) references endereco(idendereco)
);

insert into empresa_cliente (razao_social, cnpj, telefone, fk_endereco) values
('b3 bolsa, brasil, balcão s.a.', '03365836000124', '1132121234', 1);

select * from empresa_cliente;

create table if not exists data_center (
    iddata_center int auto_increment primary key,
    nome varchar(45),
    fk_cliente int,
    fk_endereco int,
    foreign key (fk_cliente) references empresa_cliente(idcliente),
    foreign key (fk_endereco) references endereco(idendereco)
);

insert into data_center (nome, fk_cliente, fk_endereco) values
('data center 1', 1, 2),
('data center 2', 1, 3),
('data center 3', 1, 4);

create table if not exists usuario_cliente (
    idusuario int auto_increment primary key,
    nome varchar(45),
    email varchar(45) unique,
    senha varchar(200),
    cargo varchar(45),
    ativo tinyint,
    acesso time,
    fk_data_center int,
    foreign key (fk_data_center) references data_center(iddata_center)
);

-- create table if not exits cargo (
--     idcarho int auto_increment primary key,
--     nome varchar(45),
--     nvlacesso tinyint

-- );

insert into usuario_cliente (nome, email, senha, cargo, ativo, acesso, fk_data_center) values 
('jennifer silva', 'jennifer.silva@b3.com.br', 'c89f6b6d56d9ce4c81489ea96082757a:14fb486a60bb1652636764bd4d3d36315fbc6d377cb0165e54aa80d7fea87e7a', 'administrador', 1, curtime(), 1),
('rogerio silva', 'rogerio.silva@b3.com.br', 'ceacd3494dcbcaa54598c1e8b0f246b8:6d251bfe3dee67a85688c6dd4c04fec5173569fc70ae9bb19e9695d1b4e54414', 'cientista', 1, curtime(), 1),
('julia silva', 'julia.silva@b3.com.br', 'f70a684b86123806da7898cd2a1905a0:3ec35de932ddcc19c8f6c38be3f29a5fdec8f6b8b9a486b150d17d6382a39645', 'analista', 1, curtime(), 1);

create table if not exists componente (
    idcomponente int auto_increment primary key,
    nomecomponente varchar(45),
    medida varchar(45)
);

insert into componente (nomecomponente, medida) values 
('cpu_percentual', '%'), 
('cpu_frequencia',  'ghz'),
('ram_percentual', '%'),
('ram_usada', 'gb'),
('disco_percentual', '%'),
('disco_usado', 'gb'),
('velocidade download','kb/s'),
('velocidade upload','kb/s');

create table if not exists servidor_cliente (
    idservidor int auto_increment primary key,
    uuidservidor varchar(45),
    sistemaoperacional varchar(45),
    discototal varchar(45),
    ramtotal varchar(45),
    processadorinfo varchar(60),
    fk_data_center int,
    foreign key (fk_data_center) references data_center(iddata_center)
);

insert into servidor_cliente (uuidservidor, sistemaoperacional, discototal, ramtotal, processadorinfo, fk_data_center) values
('uuid-dc1-srv1', 'linux', '1000.0', '32.0', 'intel xeon e5', 1),
('uuid-dc1-srv2', 'linux', '1000.0', '32.0', 'intel xeon e5', 1),
('uuid-dc1-srv3', 'linux', '2000.0', '64.0', 'amd epyc', 1),
('uuid-dc2-srv1', 'linux', '1000.0', '32.0', 'intel xeon e5', 2),
('uuid-dc2-srv2', 'linux', '1000.0', '32.0', 'intel xeon e5', 2),
('uuid-dc2-srv3', 'linux', '2000.0', '64.0', 'amd epyc', 2),
('uuid-dc3-srv1', 'linux', '1000.0', '32.0', 'intel xeon e5', 3),
('uuid-dc3-srv2', 'linux', '1000.0', '32.0', 'intel xeon e5', 3),
('uuid-dc3-srv3', 'linux', '2000.0', '64.0', 'amd epyc', 3);

create table if not exists parametro_servidor (
    idparametros_servidor int auto_increment primary key,
    limiar_alerta_atencao double,
    limiar_alerta_critico double,
    fk_servidor int,
    fk_componente int,
    foreign key (fk_componente) references componente(idcomponente)
);

insert into parametro_servidor (limiar_alerta_atencao, limiar_alerta_critico, fk_servidor, fk_componente) values 
(70.0, 80.0, 1, 1),
(70.0, 80.0, 1, 3),
(70.0, 80.0, 1, 5),
(70.0, 80.0, 2, 1),
(70.0, 80.0, 2, 3),
(70.0, 80.0, 2, 5),
(70.0, 80.0, 3, 1),
(70.0, 80.0, 3, 3),
(70.0, 80.0, 3, 5),
(70.0, 80.0, 4, 1),
(70.0, 80.0, 4, 3),
(70.0, 80.0, 4, 5),
(70.0, 80.0, 5, 1),
(70.0, 80.0, 5, 3),
(70.0, 80.0, 5, 5),
(70.0, 80.0, 6, 1),
(70.0, 80.0, 6, 3),
(70.0, 80.0, 6, 5),
(70.0, 80.0, 7, 1),
(70.0, 80.0, 7, 3),
(70.0, 80.0, 7, 5),
(70.0, 80.0, 8, 1),
(70.0, 80.0, 8, 3),
(70.0, 80.0, 8, 5),
(70.0, 80.0, 9, 1),
(70.0, 80.0, 9, 3),
(70.0, 80.0, 9, 5),
(80.0, 60.0,NULL, 1),
(80.0, 60.0, NULL, 3),
(80.0, 60.0, NULL, 5),
(1500,1000,NULL,7),
(300,500,NULL,8);

--diniz
INSERT INTO parametro_servidor (limiar_alerta, fk_servidor, fk_componente) VALUES 
(80.0, 1, 1), 
(2.30, 1, 2),
(80.0, 1, 3),
(6.0, 1, 4),
(80.0, 1, 5),
(80.0, NULL, 1),
(2.30, NULL, 2),
(80.0, NULL, 3),
(6.0, NULL, 4),
(, NULL, 5),
(200.0, NULL, 6);

create table if not exists captura (
    idcaptura int auto_increment primary key,
    valor double,
    medida varchar(45),
    data_gerado datetime,
    fk_parametro int,
    foreign key (fk_parametro) references parametro_servidor(idparametros_servidor)
);

create table if not exists alerta (
    idalerta int auto_increment primary key,
    valor double,
    medida varchar(45),
    data_gerado datetime,
    data_resolvido datetime,
    fk_parametro int,
    foreign key (fk_parametro) references parametro_servidor(idparametros_servidor)
);

-- testes de alertas
INSERT INTO alerta (valor, medida, data_gerado, data_resolvido, fk_parametro) VALUES
(85.0, '%', NOW() - INTERVAL 1 DAY, NOW() - INTERVAL 1 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 1),
(90.5, '%', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 2),
(95.0, '%', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 3),
(82.3, '%', NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 4),
(88.7, '%', NOW() - INTERVAL 5 DAY, NOW() - INTERVAL 5 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 5),
(93.2, '%', NOW() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 6),
(87.5, '%', NOW() - INTERVAL 7 DAY, NOW() - INTERVAL 7 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 7),
(91.0, '%', NOW() - INTERVAL 8 DAY, NOW() - INTERVAL 8 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 8),
(96.5, '%', NOW() - INTERVAL 9 DAY, NOW() - INTERVAL 9 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 9),
(89.2, '%', NOW() - INTERVAL 10 DAY, NOW() - INTERVAL 10 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 10),
(94.0, '%', NOW() - INTERVAL 11 DAY, NOW() - INTERVAL 11 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 11),
(97.8, '%', NOW() - INTERVAL 12 DAY, NOW() - INTERVAL 12 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 12),
(86.3, '%', NOW() - INTERVAL 13 DAY, NOW() - INTERVAL 13 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 13),
(92.5, '%', NOW() - INTERVAL 15 DAY, NOW() - INTERVAL 15 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 14),
(98.2, '%', NOW() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 15),
(90.0, '%', NOW() - INTERVAL 25 DAY, NOW() - INTERVAL 25 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 16),
(83.7, '%', NOW() - INTERVAL 12 HOUR, NOW() - INTERVAL 12 HOUR + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 17),
(88.9, '%', NOW() - INTERVAL 8 HOUR, NOW() - INTERVAL 8 HOUR + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 18),
(94.5, '%', NOW() - INTERVAL 6 HOUR, NOW() - INTERVAL 6 HOUR + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 19),
(84.2, '%', NOW() - INTERVAL 2 DAY, NOW() - INTERVAL 2 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 20),
(89.6, '%', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 21),
(95.1, '%', NOW() - INTERVAL 4 DAY, NOW() - INTERVAL 4 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 22),
(85.8, '%', NOW() - INTERVAL 10 DAY, NOW() - INTERVAL 10 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 23),
(91.3, '%', NOW() - INTERVAL 15 DAY, NOW() - INTERVAL 15 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 24),
(96.7, '%', NOW() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 25),
(81.5, '%', NOW() - INTERVAL 3 DAY, NOW() - INTERVAL 3 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 26),
(89.0, '%', NOW() - INTERVAL 6 DAY, NOW() - INTERVAL 6 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 1),
(93.5, '%', NOW() - INTERVAL 9 DAY, NOW() - INTERVAL 9 DAY + INTERVAL FLOOR(5 + RAND() * 3) MINUTE, 1);

-- views --

create or replace view vw_dashusuarios as
select u.nome, u.email, u.cargo, u.ativo, u.acesso
from usuario_cliente u
join data_center dc on u.fk_data_center = dc.iddata_center;

  -- 1. Rotas - Alertas KPI (Quantidade total de alertas)
-- View para alertas nas últimas 24 horas
CREATE OR REPLACE VIEW vw_qtd_alertas_24h AS
SELECT COUNT(*) AS total_alertas
FROM alerta
WHERE data_gerado >= NOW() - INTERVAL 24 HOUR;

-- View para alertas nos últimos 7 dias
CREATE OR REPLACE VIEW vw_qtd_alertas_7d AS
SELECT COUNT(*) AS total_alertas
FROM alerta
WHERE data_gerado >= NOW() - INTERVAL 7 DAY;


-- View para alertas nos últimos 30 dias
CREATE OR REPLACE VIEW vw_qtd_alertas_30d AS
SELECT COUNT(*) AS total_alertas
FROM alerta
WHERE data_gerado >= NOW() - INTERVAL 30 DAY;

-- 2. Rotas - Tempo médio geral
-- View para tempo médio nas últimas 24 horas
CREATE OR REPLACE VIEW vw_tempo_medio_24h AS
SELECT 
    SEC_TO_TIME(FLOOR(AVG(TIMESTAMPDIFF(SECOND, data_gerado, data_resolvido)))) AS tempo_medio
FROM alerta
WHERE data_resolvido IS NOT NULL
AND data_gerado >= NOW() - INTERVAL 24 HOUR;
select * from vw_tempo_medio_24h;
-- View para tempo médio nos últimos 7 dias
CREATE OR REPLACE VIEW vw_tempo_medio_7d AS
SELECT 
    SEC_TO_TIME(FLOOR(AVG(TIMESTAMPDIFF(SECOND, data_gerado, data_resolvido)))) AS tempo_medio
FROM alerta
WHERE data_resolvido IS NOT NULL
AND data_gerado >= NOW() - INTERVAL 7 DAY;

-- View para tempo médio nos últimos 30 dias
CREATE OR REPLACE VIEW vw_tempo_medio_30d AS
SELECT 
    SEC_TO_TIME(FLOOR(AVG(TIMESTAMPDIFF(SECOND, data_gerado, data_resolvido)))) AS tempo_medio
FROM alerta
WHERE data_resolvido IS NOT NULL
AND data_gerado >= NOW() - INTERVAL 30 DAY;


-- 3. Rotas - Top 5 alertas com maior atraso
-- View para top 5 alertas com maior atraso (24h)
CREATE OR REPLACE VIEW vw_top5_alertas_atraso_24h AS
SELECT
    dc.nome AS data_center,
    DATE_FORMAT(a.data_gerado, '%d/%m/%Y %H:%i:%s') AS data_hora,
    TIME_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)), '%H:%i:%s') AS tempo_resolucao
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 24 HOUR
ORDER BY TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido) DESC
LIMIT 5;

-- View para top 5 alertas com maior atraso (7d)
CREATE OR REPLACE VIEW vw_top5_alertas_atraso_7d AS
SELECT
    dc.nome AS data_center,
    DATE_FORMAT(a.data_gerado, '%d/%m/%Y %H:%i:%s') AS data_hora,
    TIME_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)), '%H:%i:%s') AS tempo_resolucao
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 7 DAY
ORDER BY TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido) DESC
LIMIT 5;

-- View para top 5 alertas com maior atraso (30d)
CREATE OR REPLACE VIEW vw_top5_alertas_atraso_30d AS
SELECT
    dc.nome AS data_center,
    DATE_FORMAT(a.data_gerado, '%d/%m/%Y %H:%i:%s') AS data_hora,
    TIME_FORMAT(SEC_TO_TIME(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)), '%H:%i:%s') AS tempo_resolucao
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 30 DAY
ORDER BY TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido) DESC
LIMIT 5;


-- 4. Rotas - Data Centers com maior tempo de resolução
-- View para tempo médio por data center (24h)
CREATE OR REPLACE VIEW vw_datacenter_media_resolucao_24h AS
SELECT
    dc.nome AS data_center,
    TIME_FORMAT(SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido))), '%H:%i:%s') AS tempo_medio
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 24 HOUR
GROUP BY dc.nome
ORDER BY tempo_medio DESC;

-- View para tempo médio por data center (7d)
CREATE OR REPLACE VIEW vw_datacenter_media_resolucao_7d AS
SELECT
    dc.nome AS data_center,
    TIME_FORMAT(SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido))), '%H:%i:%s') AS tempo_medio
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 7 DAY
GROUP BY dc.nome
ORDER BY tempo_medio DESC;

-- View para tempo médio por data center (30d)
CREATE OR REPLACE VIEW vw_datacenter_media_resolucao_30d AS
SELECT
    dc.nome AS data_center,
    TIME_FORMAT(SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido))), '%H:%i:%s') AS tempo_medio
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 30 DAY
GROUP BY dc.nome
ORDER BY tempo_medio DESC;


-- 5. Rotas - Data Centers total de alertas
-- View para total de alertas por data center (24h)
CREATE OR REPLACE VIEW vw_datacenter_total_alertas_24h AS
SELECT
    dc.nome AS data_center,
    COUNT(a.idalerta) AS total_alertas
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 24 HOUR
GROUP BY dc.nome
ORDER BY total_alertas DESC;

-- View para total de alertas por data center (7d)
CREATE OR REPLACE VIEW vw_datacenter_total_alertas_7d AS
SELECT
    dc.nome AS data_center,
    COUNT(a.idalerta) AS total_alertas
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 7 DAY
GROUP BY dc.nome
ORDER BY total_alertas DESC;

-- View para total de alertas por data center (30d)
CREATE OR REPLACE VIEW vw_datacenter_total_alertas_30d AS
SELECT
    dc.nome AS data_center,
    COUNT(a.idalerta) AS total_alertas
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 30 DAY
GROUP BY dc.nome
ORDER BY total_alertas DESC;


-- 6. Rotas - Data Centers alertas atrasados
-- View para alertas atrasados por data center (24h)
CREATE OR REPLACE VIEW vw_datacenter_alertas_atrasados_24h AS
SELECT
    dc.nome AS data_center,
    COUNT(a.idalerta) AS alertas_atrasados
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 24 HOUR
AND TIMESTAMPDIFF(MINUTE, a.data_gerado, a.data_resolvido) > 5
GROUP BY dc.nome
ORDER BY alertas_atrasados DESC;

-- View para alertas atrasados por data center (7d)
CREATE OR REPLACE VIEW vw_datacenter_alertas_atrasados_7d AS
SELECT
    dc.nome AS data_center,
    COUNT(a.idalerta) AS alertas_atrasados
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 7 DAY
AND TIMESTAMPDIFF(MINUTE, a.data_gerado, a.data_resolvido) > 5
GROUP BY dc.nome
ORDER BY alertas_atrasados DESC;

-- View para alertas atrasados por data center (30d)
CREATE OR REPLACE VIEW vw_datacenter_alertas_atrasados_30d AS
SELECT
    dc.nome AS data_center,
    COUNT(a.idalerta) AS alertas_atrasados
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 30 DAY
AND TIMESTAMPDIFF(MINUTE, a.data_gerado, a.data_resolvido) > 5
GROUP BY dc.nome
ORDER BY alertas_atrasados DESC;

-- 1. Rotas - Alertas KPI
SELECT * FROM vw_qtd_alertas_24h;
SELECT * FROM vw_qtd_alertas_7d;
SELECT * FROM vw_qtd_alertas_30d;

-- 2. Rotas - Tempo médio geral
SELECT * FROM vw_tempo_medio_24h;
SELECT * FROM vw_tempo_medio_7d;
SELECT * FROM vw_tempo_medio_30d;

-- 3. Rotas - Top 5 alertas com maior atraso
SELECT * FROM vw_top5_alertas_atraso_24h;
SELECT * FROM vw_top5_alertas_atraso_7d;
SELECT * FROM vw_top5_alertas_atraso_30d;

-- 4. Rotas - Data Centers com maior tempo de resolução
SELECT * FROM vw_datacenter_media_resolucao_24h;
SELECT * FROM vw_datacenter_media_resolucao_7d;
SELECT * FROM vw_datacenter_media_resolucao_30d;

-- 5. Rotas - Data Centers total de alertas
SELECT * FROM vw_datacenter_total_alertas_24h;
SELECT * FROM vw_datacenter_total_alertas_7d;
SELECT * FROM vw_datacenter_total_alertas_30d;

-- 6. Rotas - Data Centers alertas atrasados
SELECT * FROM vw_datacenter_alertas_atrasados_24h;
SELECT * FROM vw_datacenter_alertas_atrasados_7d;
SELECT * FROM vw_datacenter_alertas_atrasados_30d;