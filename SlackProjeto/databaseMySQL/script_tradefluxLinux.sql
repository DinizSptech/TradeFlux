-- active: 1732573765546@@127.0.0.1@3306@allset
-- usuarios e privilegios

drop user if exists 'user_insert_tradeflux'@'%';
create user 'user_insert_tradeflux'@'%' identified by 'tradeflux_insert';
grant all privileges on tradeflux.* to 'user_insert_tradeflux'@'%';

drop user if exists 'user_select_tradeflux'@'%';
create user 'user_select_tradeflux'@'%' identified by 'tradeflux_select';
grant all privileges on tradeflux.* to 'user_select_tradeflux'@'%';
-- update mysql.user set host='%' where user='root' and host='localhost';
flush privileges;

drop database if exists tradeflux;
create database if not exists tradeflux;
use tradeflux;

-- Script 1: Contagem de alertas por criticidade separadamente
-- Alertas de criticidade 3 (crítico) no datacenter 1 - últimos 30 dias
SELECT COUNT(*) AS quantidade_alertas_criticos
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE dc.iddata_center = 1
  AND a.criticidade = 3
  AND a.data_gerado >= NOW() - INTERVAL 30 DAY;

-- Alertas de criticidade 1 (atenção) no datacenter 1 - últimos 30 dias
SELECT COUNT(*) AS quantidade_alertas_atencao
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE dc.iddata_center = 1
  AND a.criticidade = 1
  AND a.data_gerado >= NOW() - INTERVAL 30 DAY;

-- Script 2: Contagem agrupada em uma única consulta
SELECT 
    a.criticidade,
    COUNT(*) AS quantidade_alertas,
    CASE 
        WHEN a.criticidade = 1 THEN 'Atenção'
        WHEN a.criticidade = 3 THEN 'Crítico'
        ELSE 'Outro'
    END AS tipo_criticidade
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE dc.iddata_center = 1
  AND a.criticidade IN (1, 3)
  AND a.data_gerado >= NOW() - INTERVAL 30 DAY
GROUP BY a.criticidade
ORDER BY a.criticidade;

-- SELECT 
--     s.idservidor,
--     s.uuidservidor,
--     SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS alertas_atencao,
--     SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS alertas_criticos,
--     COUNT(*) AS total_alertas
-- FROM alerta a
-- JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
-- JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
-- JOIN data_center dc ON s.fk_data_center = dc.iddata_center
-- WHERE dc.iddata_center = 1
--   AND a.criticidade IN (1, 3)
--   AND a.data_gerado >= NOW() - INTERVAL 30 DAY
-- GROUP BY s.idservidor, s.uuidservidor
-- ORDER BY total_alertas DESC;



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
('Data Center 1', 1, 2),
('Data Center 2', 1, 3),
('Data Center 3', 1, 4);

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
(70.0, 80.0,NULL, 1),
(70.0, 80.0, NULL, 3),
(70.0, 80.0, NULL, 5),
(1500,1000,NULL,7),
(500,300,NULL,8);

create table if not exists alerta (
    idalerta int auto_increment primary key,
    idjira varchar(20),
    valor double,
    medida varchar(45),
    data_gerado datetime,
    data_resolvido datetime,
    criticidade int,
    fk_parametro int,
    foreign key (fk_parametro) references parametro_servidor(idparametros_servidor)
);

-- testes de alertas

INSERT INTO alerta (valor, medida, data_gerado, data_resolvido, criticidade, fk_parametro) VALUES
(75.2, '%', '2025-05-31 08:15:23', '2025-05-31 08:25:23', 1, 1),  
(76.8, '%', '2025-05-28 10:22:12', '2025-05-28 10:32:12', 1, 2),  
(77.5, '%', '2025-05-10 14:38:47', '2025-05-10 14:50:47', 1, 3),  
(78.1, '%', '2025-05-31 09:12:34', '2025-05-31 09:14:56', 1, 4),
(79.3, '%', '2025-05-30 13:45:21', '2025-05-30 13:47:42', 1, 5),
(80.5, '%', '2025-05-31 16:23:45', '2025-05-31 16:35:45', 3, 10),  
(81.7, '%', '2025-05-29 11:34:12', '2025-05-29 11:44:12', 3, 11),  
(82.3, '%', '2025-05-15 08:45:23', '2025-05-15 08:55:23', 3, 12),  
(83.6, '%', '2025-05-31 12:12:34', '2025-05-31 12:14:56', 3, 13),
(84.2, '%', '2025-05-30 15:23:45', '2025-05-30 15:25:57', 3, 14),
(85.4, '%', '2025-05-31 09:34:56', '2025-05-31 09:45:56', 3, 19), 
(86.7, '%', '2025-05-28 14:45:12', '2025-05-28 14:55:12', 3, 20), 
(87.2, '%', '2025-05-12 10:12:34', '2025-05-12 10:22:34', 3, 21),  
(88.5, '%', '2025-05-31 13:23:45', '2025-05-31 13:25:57', 3, 22),
(89.1, '%', '2025-05-30 16:34:56', '2025-05-30 16:37:18', 3, 23),
(90.3, '%', '2025-05-29 11:45:12', '2025-05-29 11:55:34', 3, 1),
(91.6, '%', '2025-05-28 14:56:23', '2025-05-28 14:58:45', 3, 4),
(92.1, '%', '2025-05-27 09:15:34', '2025-05-27 09:25:45', 3, 7),
(93.4, '%', '2025-05-26 11:22:53', '2025-05-26 11:25:12', 3, 10),
(94.7, '%', '2025-05-25 14:38:29', '2025-05-25 14:48:47', 3, 13),
(95.2, '%', '2025-05-24 16:45:18', '2025-05-24 16:55:28', 3, 16),
(96.5, '%', '2025-05-23 08:12:37', '2025-05-23 08:22:49', 3, 19),
(97.8, '%', '2025-05-22 10:23:45', '2025-05-22 10:33:57', 3, 22),
(98.1, '%', '2025-05-21 13:34:56', '2025-05-21 13:44:08', 3, 25),
(75.2, '%', '2025-06-02 08:15:23', '2025-06-02 08:25:23', 1, 1),  
(76.8, '%', '2025-06-02 10:22:12', '2025-06-02 10:32:12', 1, 2),  
(77.5, '%', '2025-06-03 14:38:47', '2025-06-03 14:50:47', 1, 3),  
(78.1, '%', '2025-06-03 09:12:34', '2025-06-03 09:14:56', 1, 4);

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

SELECT 
    DATE(a.data_gerado) AS data_alerta,
    SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS alertas_atencao,
    SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS alertas_criticos,
    COUNT(*) AS total_alertas
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
WHERE s.fk_data_center = 1
  AND a.data_gerado >= CURDATE() - INTERVAL 29 DAY
GROUP BY DATE(a.data_gerado)
ORDER BY DATE(a.data_gerado);

SELECT
    status,
    ROUND(COUNT(*) * 100.0 / (SELECT COUNT(*) FROM servidor_cliente WHERE fk_data_center = 1), 2) AS percentual
FROM (
    SELECT 
        s.idservidor,
        MAX(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS tem_critico,
        MAX(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS tem_atencao,
        CASE 
            WHEN MAX(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) = 1 THEN 'Crítico'
            WHEN MAX(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) = 1 THEN 'Atenção'
            ELSE 'Estável'
        END AS status
    FROM servidor_cliente s
    LEFT JOIN parametro_servidor p ON s.idservidor = p.fk_servidor
    LEFT JOIN alerta a ON p.idparametros_servidor = a.fk_parametro
        AND a.data_gerado >= NOW() - INTERVAL 30 DAY
    WHERE s.fk_data_center = 1
    GROUP BY s.idservidor
) AS classificacao
GROUP BY status;


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


SELECT 
    c.nomecomponente AS componente,
    SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS alertas_atencao,
    SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS alertas_criticos,
    COUNT(*) AS total_alertas
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN componente c ON p.fk_componente = c.idcomponente
LEFT JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
LEFT JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE (dc.iddata_center = 1 OR dc.iddata_center IS NULL) -- Inclui parâmetros globais
  AND c.nomecomponente IN ('cpu_percentual', 'ram_percentual', 'disco_percentual')
  AND a.criticidade IN (1, 3)
  AND a.data_gerado >= NOW() - INTERVAL 30 DAY
GROUP BY c.nomecomponente
ORDER BY total_alertas DESC;

SELECT 
    CONCAT('Servidor ', s.idservidor) AS nome_servidor,
    COUNT(*) AS qtd_alertas_atencao
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE a.criticidade = 1
  AND a.data_gerado >= NOW() - INTERVAL 30 DAY
  AND dc.iddata_center = 1
GROUP BY s.idservidor
ORDER BY qtd_alertas_atencao DESC
LIMIT 5;

SELECT
    ROUND(SUM(
        CASE 
            WHEN a.criticidade = 3 THEN 1
            ELSE 0
        END > 0
    ) * 100.0 / COUNT(DISTINCT s.idservidor), 2) AS critico,
    
    ROUND(SUM(
        CASE 
            WHEN a.criticidade = 3 THEN 0
            WHEN a.criticidade = 1 THEN 1
            ELSE 0
        END > 0
        AND s.idservidor NOT IN (
            SELECT s2.idservidor
            FROM alerta a2
            JOIN parametro_servidor p2 ON a2.fk_parametro = p2.idparametros_servidor
            JOIN servidor_cliente s2 ON p2.fk_servidor = s2.idservidor
            WHERE a2.criticidade = 3
              AND a2.data_gerado >= NOW() - INTERVAL 30 DAY
              AND s2.fk_data_center = 1
        )
    ) * 100.0 / COUNT(DISTINCT s.idservidor), 2) AS atencao,

    ROUND(SUM(
        s.idservidor NOT IN (
            SELECT s3.idservidor
            FROM alerta a3
            JOIN parametro_servidor p3 ON a3.fk_parametro = p3.idparametros_servidor
            JOIN servidor_cliente s3 ON p3.fk_servidor = s3.idservidor
            WHERE a3.data_gerado >= NOW() - INTERVAL 30 DAY
              AND s3.fk_data_center = 1
        )
    ) * 100.0 / COUNT(DISTINCT s.idservidor), 2) AS estavel

FROM servidor_cliente s
LEFT JOIN parametro_servidor p ON s.idservidor = p.fk_servidor
LEFT JOIN alerta a ON p.idparametros_servidor = a.fk_parametro
    AND a.data_gerado >= NOW() - INTERVAL 30 DAY
WHERE s.fk_data_center = 1;


SELECT
    -- Totais nos últimos 30 dias
    SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS alertas_atencao_30d,
    SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS alertas_criticos_30d,
    SUM(CASE WHEN a.criticidade = 1 AND a.data_gerado >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS alertas_atencao_1d,
    SUM(CASE WHEN a.criticidade = 3 AND a.data_gerado >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS alertas_criticos_1d,
    ROUND(
        CASE 
            WHEN SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) = 0 THEN 0
            ELSE (
                (SUM(CASE WHEN a.criticidade = 1 AND a.data_gerado >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) * 100.0)
                / SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END)
            )
        END, 2
    ) AS taxa_alertas_atencao,
    ROUND(
        CASE 
            WHEN SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) = 0 THEN 0
            ELSE (
                (SUM(CASE WHEN a.criticidade = 3 AND a.data_gerado >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) * 100.0)
                / SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END)
            )
        END, 2
    ) AS taxa_alertas_criticos
FROM alerta a
JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
JOIN data_center dc ON s.fk_data_center = dc.iddata_center
WHERE dc.iddata_center = 1
  AND a.criticidade IN (1, 3)
  AND a.data_gerado >= NOW() - INTERVAL 30 DAY;

SELECT
    CASE 
        WHEN total_critico_30d = 0 AND total_critico_1d > 0 THEN 'NOVOS_ALERTAS'
        WHEN total_critico_30d = 0 AND total_critico_1d = 0 THEN 'SEM_DADOS'
        ELSE ROUND((total_critico_1d * 100.0) / total_critico_30d, 2)
    END AS taxa_alertas_criticos,
    CASE 
        WHEN total_atencao_30d = 0 AND total_atencao_1d > 0 THEN 'NOVOS_ALERTAS'
        WHEN total_atencao_30d = 0 AND total_atencao_1d = 0 THEN 'SEM_DADOS'
        ELSE ROUND((total_atencao_1d * 100.0) / total_atencao_30d, 2)
    END AS taxa_alertas_atencao

FROM (
    SELECT 
        SUM(CASE WHEN a.criticidade = 3 THEN 1 ELSE 0 END) AS total_critico_30d,
        SUM(CASE WHEN a.criticidade = 1 THEN 1 ELSE 0 END) AS total_atencao_30d,
        SUM(CASE WHEN a.criticidade = 3 AND a.data_gerado >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS total_critico_1d,
        SUM(CASE WHEN a.criticidade = 1 AND a.data_gerado >= NOW() - INTERVAL 1 DAY THEN 1 ELSE 0 END) AS total_atencao_1d

    FROM alerta a
    JOIN parametro_servidor p ON a.fk_parametro = p.idparametros_servidor
    JOIN servidor_cliente s ON p.fk_servidor = s.idservidor
    JOIN data_center dc ON s.fk_data_center = dc.iddata_center
    WHERE dc.iddata_center = ${idDataCenter}
      AND a.data_gerado >= NOW() - INTERVAL 30 DAY
) AS contagem;

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