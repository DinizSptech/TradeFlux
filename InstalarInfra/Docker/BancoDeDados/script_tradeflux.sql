-- active: 1732573765546@@127.0.0.1@3306@allset
-- usuarios e privilegios

CREATE USER IF NOT EXISTS 'user_insert_tradeflux'@'%' IDENTIFIED BY 'tradeflux_insert';
grant all privileges on tradeflux.* to 'user_insert_tradeflux'@'%';

CREATE USER IF NOT EXISTS 'user_select_tradeflux'@'%' IDENTIFIED BY 'tradeflux_select';
grant all privileges on tradeflux.* to 'user_select_tradeflux'@'%';
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
    foreign key (fk_servidor) references servidor_cliente(idservidor),
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
(70.0, 80.0, 9, 5);

create table if not exists alerta (
    idalerta INT AUTO_INCREMENT PRIMARY KEY,
    idjira varchar(30),
    possui_idjira TINYINT DEFAULT 0,
    valor DOUBLE,
    medida VARCHAR(45),
    data_gerado DATETIME,
    data_resolvido DATETIME,
    criticidade INT,
    fk_parametro INT,
    FOREIGN KEY (fk_parametro) REFERENCES parametro_servidor(idparametros_servidor)
);

-- testes de alertas

-- Alertas das últimas 24 horas (09/06/2025)
INSERT INTO alerta (valor, medida, data_gerado, data_resolvido, criticidade, fk_parametro) VALUES
(76.4, '%', '2025-06-09 02:15:32', '2025-06-09 02:21:48', 1, 2),
(78.9, '%', '2025-06-09 05:42:18', '2025-06-09 05:47:33', 1, 5),
(82.1, '%', '2025-06-09 08:23:45', '2025-06-09 08:29:12', 3, 8),
(85.7, '%', '2025-06-09 11:56:29', '2025-06-09 12:02:41', 3, 12),
(88.3, '%', '2025-06-09 14:18:57', '2025-06-09 14:24:23', 3, 15),
(91.2, '%', '2025-06-09 17:35:14', '2025-06-09 17:40:58', 3, 18),
(93.8, '%', '2025-06-09 20:47:36', '2025-06-09 20:53:19', 3, 21),
(96.1, '%', '2025-06-09 23:12:08', '2025-06-09 23:17:44', 3, 24),
(74.8, '%', '2025-06-08 09:33:27', '2025-06-08 09:39:15', 1, 1),
(77.6, '%', '2025-06-08 13:28:49', '2025-06-08 13:34:22', 1, 4),
(80.3, '%', '2025-06-08 16:45:13', '2025-06-08 16:50:37', 3, 7),
(83.9, '%', '2025-06-07 07:22:54', '2025-06-07 07:28:18', 3, 10),
(86.4, '%', '2025-06-07 12:17:36', '2025-06-07 12:23:02', 3, 13),
(89.7, '%', '2025-06-07 18:54:21', '2025-06-07 19:00:15', 3, 16),
(92.5, '%', '2025-06-06 10:41:58', '2025-06-06 10:47:33', 3, 19),
(95.1, '%', '2025-06-06 15:23:47', '2025-06-06 15:29:21', 3, 22),
(75.9, '%', '2025-06-05 08:56:12', '2025-06-05 09:01:48', 1, 3),
(79.2, '%', '2025-06-05 14:18:35', '2025-06-05 14:24:07', 1, 6),
(82.7, '%', '2025-06-04 11:42:29', '2025-06-04 11:48:15', 3, 9),
(85.3, '%', '2025-06-04 17:29:43', '2025-06-04 17:35:28', 3, 11),
(88.8, '%', '2025-06-03 09:15:56', '2025-06-03 09:21:42', 3, 14),
(91.4, '%', '2025-06-03 13:47:18', '2025-06-03 13:52:54', 3, 17),
(94.6, '%', '2025-06-02 16:34:27', '2025-06-02 16:40:13', 3, 20),
(97.2, '%', '2025-06-02 19:58:41', '2025-06-02 20:04:29', 3, 23),
(76.1, '%', '2025-06-01 08:27:19', '2025-06-01 08:32:45', 1, 2),
(78.5, '%', '2025-06-01 14:53:36', '2025-06-01 14:59:12', 1, 5),
(81.8, '%', '2025-05-31 10:19:47', '2025-05-31 10:25:23', 3, 8),
(84.2, '%', '2025-05-31 16:42:58', '2025-05-31 16:48:34', 3, 11),
(87.6, '%', '2025-05-30 09:36:21', '2025-05-30 09:42:07', 3, 14),
(90.3, '%', '2025-05-30 15:18:44', '2025-05-30 15:24:30', 3, 17),
(93.1, '%', '2025-05-29 11:25:37', '2025-05-29 11:31:23', 3, 20),
(95.7, '%', '2025-05-29 17:49:12', '2025-05-29 17:54:58', 3, 23),
(74.3, '%', '2025-05-28 07:34:55', '2025-05-28 07:40:41', 1, 1),
(77.8, '%', '2025-05-28 13:27:28', '2025-05-28 13:33:14', 1, 4),
(80.9, '%', '2025-05-27 09:52:43', '2025-05-27 09:58:29', 3, 7),
(83.4, '%', '2025-05-27 15:16:19', '2025-05-27 15:22:05', 3, 10),
(86.8, '%', '2025-05-26 11:43:52', '2025-05-26 11:49:38', 3, 13),
(89.5, '%', '2025-05-26 18:28:17', '2025-05-26 18:34:03', 3, 16),
(92.7, '%', '2025-05-25 08:15:46', '2025-05-25 08:21:32', 3, 19),
(94.9, '%', '2025-05-25 14:59:31', '2025-05-25 15:05:17', 3, 22),
(75.6, '%', '2025-05-24 10:37:24', '2025-05-24 10:43:10', 1, 3),
(78.2, '%', '2025-05-24 16:21:58', '2025-05-24 16:27:44', 1, 6),
(81.5, '%', '2025-05-23 12:48:13', '2025-05-23 12:53:59', 3, 9),
(84.7, '%', '2025-05-23 19:14:37', '2025-05-23 19:20:23', 3, 12),
(87.9, '%', '2025-05-22 09:56:42', '2025-05-22 10:02:28', 3, 15),
(90.6, '%', '2025-05-22 15:33:25', '2025-05-22 15:39:11', 3, 18),
(93.3, '%', '2025-05-21 11:18:56', '2025-05-21 11:24:42', 3, 21),
(96.4, '%', '2025-05-21 17:45:29', '2025-05-21 17:51:15', 3, 24),
(76.7, '%', '2025-05-20 08:22:14', '2025-05-20 08:28:00', 1, 1),
(79.4, '%', '2025-05-20 14:07:38', '2025-05-20 14:13:24', 1, 4),
(82.8, '%', '2025-05-19 10:54:27', '2025-05-19 11:00:13', 3, 7),
(85.1, '%', '2025-05-19 16:41:52', '2025-05-19 16:47:38', 3, 10),
(88.6, '%', '2025-05-18 12:29:15', '2025-05-18 12:35:01', 3, 13),
(91.8, '%', '2025-05-18 18:52:49', '2025-05-18 18:58:35', 3, 16),
(94.4, '%', '2025-05-17 09:17:33', '2025-05-17 09:23:19', 3, 19),
(97.1, '%', '2025-05-17 15:43:26', '2025-05-17 15:49:12', 3, 22),
(75.2, '%', '2025-05-16 11:38:57', '2025-05-16 11:44:43', 1, 2),
(78.9, '%', '2025-05-16 17:26:41', '2025-05-16 17:32:27', 1, 5),
(81.3, '%', '2025-05-15 08:14:22', '2025-05-15 08:20:08', 3, 8),
(84.6, '%', '2025-05-15 14:59:35', '2025-05-15 15:05:21', 3, 11),
(87.2, '%', '2025-05-14 10:47:18', '2025-05-14 10:53:04', 3, 14),
(90.7, '%', '2025-05-14 16:33:49', '2025-05-14 16:39:35', 3, 17),
(93.5, '%', '2025-05-13 12:21:56', '2025-05-13 12:27:42', 3, 20),
(96.8, '%', '2025-05-13 18:48:17', '2025-05-13 18:54:03', 3, 23),
(77.1, '%', '2025-05-12 09:36:28', '2025-05-12 09:42:14', 1, 3),
(79.8, '%', '2025-05-12 15:23:54', '2025-05-12 15:29:40', 1, 6),
(82.4, '%', '2025-05-11 11:11:37', '2025-05-11 11:17:23', 3, 9),
(85.9, '%', '2025-05-11 17:58:21', '2025-05-11 18:04:07', 3, 12),
(88.1, '%', '2025-05-10 08:45:43', '2025-05-10 08:51:29', 3, 15),
(91.3, '%', '2025-05-10 14:32:56', '2025-05-10 14:38:42', 3, 18);
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
WHERE data_gerado >= NOW() - INTERVAL 24 HOUR
AND data_resolvido IS NOT NULL
AND TIMESTAMPDIFF(MINUTE, data_gerado, data_resolvido) > 5;

-- View para alertas nos últimos 7 dias
CREATE OR REPLACE VIEW vw_qtd_alertas_7d AS
SELECT COUNT(*) AS total_alertas
FROM alerta
WHERE data_gerado >= NOW() - INTERVAL 7 DAY
AND data_resolvido IS NOT NULL
AND TIMESTAMPDIFF(MINUTE, data_gerado, data_resolvido) > 5;

-- View para alertas nos últimos 30 dias
CREATE OR REPLACE VIEW vw_qtd_alertas_30d AS
SELECT COUNT(*) AS total_alertas
FROM alerta
WHERE data_gerado >= NOW() - INTERVAL 30 DAY
AND data_resolvido IS NOT NULL
AND TIMESTAMPDIFF(MINUTE, data_gerado, data_resolvido) > 5;

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

CREATE OR REPLACE VIEW vw_datacenter_media_resolucao_24h_numerica AS
SELECT
    dc.nome AS data_center,
    
    TIME_FORMAT(SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido))), '%H:%i:%s') AS tempo_medio_formatado,
    
    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) AS tempo_medio_segundos,

    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) / 60 AS tempo_medio_minutos,
    
    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) / 3600 AS tempo_medio_horas

FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 24 HOUR
GROUP BY dc.nome
ORDER BY tempo_medio_segundos DESC;

CREATE OR REPLACE VIEW vw_datacenter_media_resolucao_7d_numerica AS
SELECT
    dc.nome AS data_center,
    
    TIME_FORMAT(SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido))), '%H:%i:%s') AS tempo_medio_formatado,
    
    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) AS tempo_medio_segundos,

    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) / 60 AS tempo_medio_minutos,
    
    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) / 3600 AS tempo_medio_horas

FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 7 DAY
GROUP BY dc.nome
ORDER BY tempo_medio_segundos DESC;

CREATE OR REPLACE VIEW vw_datacenter_media_resolucao_30d_numerica AS
SELECT
    dc.nome AS data_center,
    
    TIME_FORMAT(SEC_TO_TIME(AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido))), '%H:%i:%s') AS tempo_medio_formatado,
    
    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) AS tempo_medio_segundos,

    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) / 60 AS tempo_medio_minutos,
    
    AVG(TIMESTAMPDIFF(SECOND, a.data_gerado, a.data_resolvido)) / 3600 AS tempo_medio_horas

FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.data_gerado >= NOW() - INTERVAL 30 DAY
GROUP BY dc.nome
ORDER BY tempo_medio_segundos DESC;

-- -- -- 1. Rotas - Alertas KPI
-- SELECT * FROM vw_qtd_alertas_24h;
-- SELECT * FROM vw_qtd_alertas_7d;
-- SELECT * FROM vw_qtd_alertas_30d;

-- -- 2. Rotas - Tempo médio geral
-- SELECT * FROM vw_tempo_medio_24h;
-- SELECT * FROM vw_tempo_medio_7d;
-- SELECT * FROM vw_tempo_medio_30d;

-- -- 3. Rotas - Top 5 alertas com maior atraso
-- SELECT * FROM vw_top5_alertas_atraso_24h;
-- SELECT * FROM vw_top5_alertas_atraso_7d;
-- SELECT * FROM vw_top5_alertas_atraso_30d;

-- -- 4. Rotas - Data Centers com maior tempo de resolução
-- SELECT * FROM vw_datacenter_media_resolucao_24h;
-- SELECT * FROM vw_datacenter_media_resolucao_7d;
-- SELECT * FROM vw_datacenter_media_resolucao_30d;

-- -- 5. Rotas - Data Centers total de alertas
-- SELECT * FROM vw_datacenter_total_alertas_24h;
-- SELECT * FROM vw_datacenter_total_alertas_7d;
-- SELECT * FROM vw_datacenter_total_alertas_30d;

-- -- 6. Rotas - Data Centers alertas atrasados
-- SELECT * FROM vw_datacenter_alertas_atrasados_24h;
-- SELECT * FROM vw_datacenter_alertas_atrasados_7d;
-- SELECT * FROM vw_datacenter_alertas_atrasados_30d;