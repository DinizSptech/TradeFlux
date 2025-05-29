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
insert into usuario_cliente (nome, email, senha, cargo, ativo, acesso, fk_data_center) values 
('jennifer silva', 'jennifer.silva@b3.com.br', 'c89f6b6d56d9ce4c81489ea96082757a:14fb486a60bb1652636764bd4d3d36315fbc6d377cb0165e54aa80d7fea87e7a', 'administrador', 1, curtime(), 1);

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
    limiar_alerta double,
    fk_servidor int,
    fk_componente int,
    foreign key (fk_componente) references componente(idcomponente)
);
insert into parametro_servidor (limiar_alerta, fk_servidor, fk_componente) values 
(80.0, 1, 1),
(80.0, 1, 3),
(80.0, 1, 5),
(80.0, 2, 1),
(80.0, 2, 3),
(80.0, 2, 5),
(80.0, 3, 1),
(80.0, 3, 3),
(80.0, 3, 5),
(80.0, 4, 1),
(80.0, 4, 3),
(80.0, 4, 5),
(80.0, 5, 1),
(80.0, 5, 3),
(80.0, 5, 5),
(80.0, 6, 1),
(80.0, 6, 3),
(80.0, 6, 5),
(80.0, 7, 1),
(80.0, 7, 3),
(80.0, 7, 5),
(80.0, 8, 1),
(80.0, 8, 3),
(80.0, 8, 5),
(80.0, 9, 1),
(80.0, 9, 3),
(80.0, 9, 5);

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
select * from parametro_servidor;
insert into alerta (valor, medida, data_gerado, data_resolvido, fk_parametro) values
(85.0, '%', now() - interval 1 day, now() - interval 1 day + interval floor(2 + rand() * 9) minute, 1),
(90.5, '%', now() - interval 2 day, now() - interval 2 day + interval floor(2 + rand() * 9) minute, 2),
(95.0, '%', now() - interval 3 day, now() - interval 3 day + interval floor(2 + rand() * 9) minute, 3),
(82.3, '%', now() - interval 4 day, now() - interval 4 day + interval floor(2 + rand() * 9) minute, 4),
(88.7, '%', now() - interval 5 day, now() - interval 5 day + interval floor(2 + rand() * 9) minute, 5),
(93.2, '%', now() - interval 6 day, now() - interval 6 day + interval floor(2 + rand() * 9) minute, 6),
(87.5, '%', now() - interval 7 day, now() - interval 7 day + interval floor(2 + rand() * 9) minute, 7),
(91.0, '%', now() - interval 8 day, now() - interval 8 day + interval floor(2 + rand() * 9) minute, 8),
(96.5, '%', now() - interval 9 day, now() - interval 9 day + interval floor(2 + rand() * 9) minute, 9),
(89.2, '%', now() - interval 10 day, now() - interval 10 day + interval floor(2 + rand() * 9) minute, 10),
(94.0, '%', now() - interval 11 day, now() - interval 11 day + interval floor(2 + rand() * 9) minute, 11),
(97.8, '%', now() - interval 12 day, now() - interval 12 day + interval floor(2 + rand() * 9) minute, 12),
(86.3, '%', now() - interval 13 day, now() - interval 13 day + interval floor(2 + rand() * 9) minute, 13),
(92.5, '%', now() - interval 15 day, now() - interval 15 day + interval floor(2 + rand() * 9) minute, 14),
(98.2, '%', now() - interval 20 day, now() - interval 20 day + interval floor(2 + rand() * 9) minute, 15),
(90.0, '%', now() - interval 25 day, now() - interval 25 day + interval floor(2 + rand() * 9) minute, 16),
(83.7, '%', now() - interval 12 hour, now() - interval 12 hour + interval floor(2 + rand() * 9) minute, 17),
(88.9, '%', now() - interval 8 hour, now() - interval 8 hour + interval floor(2 + rand() * 9) minute, 18),
(94.5, '%', now() - interval 6 hour, now() - interval 6 hour + interval floor(2 + rand() * 9) minute, 19),
(84.2, '%', now() - interval 2 day, now() - interval 2 day + interval floor(2 + rand() * 9) minute, 20),
(89.6, '%', now() - interval 3 day, now() - interval 3 day + interval floor(2 + rand() * 9) minute, 21),
(95.1, '%', now() - interval 4 day, now() - interval 4 day + interval floor(2 + rand() * 9) minute, 22),
(85.8, '%', now() - interval 10 day, now() - interval 10 day + interval floor(2 + rand() * 9) minute, 23),
(91.3, '%', now() - interval 15 day, now() - interval 15 day + interval floor(2 + rand() * 9) minute, 24),
(96.7, '%', now() - interval 20 day, now() - interval 20 day + interval floor(2 + rand() * 9) minute, 25),
(81.5, '%', now() - interval 3 day, now() - interval 3 day + interval floor(2 + rand() * 9) minute, 26),
(89.0, '%', now() - interval 6 day, now() - interval 6 day + interval floor(2 + rand() * 9) minute, 27),
(93.5, '%', now() - interval 9 day, now() - interval 9 day + interval floor(2 + rand() * 9) minute, 27);
select count(*) as total_alertas from alerta;
select * from alerta;

-- views --

create or replace view vw_dashusuarios as
select u.nome, u.email, u.cargo, u.ativo, u.acesso
from usuario_cliente u
join data_center dc on u.fk_data_center = dc.iddata_center;

create or replace view vw_alertas_simples as
select
    dc.nome as 'data center',
    date_format(a.data_gerado, '%d/%m/%Y %H:%i:%s') as 'data-hora',
    time_format(sec_to_time(timestampdiff(second, a.data_gerado, a.data_resolvido)), '%H:%i:%s') as 'tempo de resolução'
from alerta a
join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
join servidor_cliente s on p.fk_servidor = s.idservidor
join data_center dc on s.fk_data_center = dc.iddata_center
where a.medida = '%'
order by a.data_gerado desc
limit 5;

-- últimas 24 horas
select * from vw_alertas_simples
where str_to_date(`data-hora`, '%d/%m/%Y %H:%i:%s') >= now() - interval 24 hour
order by `tempo de resolução` desc;

-- últimos 7 dias
select * from vw_alertas_simples
where str_to_date(`data-hora`, '%d/%m/%Y %H:%i:%s') >= now() - interval 7 day
order by `tempo de resolução` desc;

-- últimos 30 dias
select * from vw_alertas_simples
where str_to_date(`data-hora`, '%d/%m/%Y %H:%i:%s') >= now() - interval 30 day
order by `tempo de resolução` desc;

-- total alertas acima de 5 minutos - kpi
-- 24 horas
select count(*) from alerta
where timestampdiff(minute, data_gerado, data_resolvido) > 5
and data_gerado >= now() - interval 24 hour;

-- 7 dias
select count(*) from alerta
where timestampdiff(minute, data_gerado, data_resolvido) > 5
and data_gerado >= now() - interval 7 day;

-- 30 dias
select count(*) from alerta
where timestampdiff(minute, data_gerado, data_resolvido) > 5
and data_gerado >= now() - interval 30 day;

-- view tempo médio de resolução por data center
create or replace view vw_resolucao_medio_datacenter as
select
    dc.nome as data_center,
    time_format(sec_to_time(avg(timestampdiff(second, a.data_gerado, a.data_resolvido))), '%H:%i:%s') as tempo_medio_resolucao
from alerta a
join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
join servidor_cliente s on p.fk_servidor = s.idservidor
join data_center dc on s.fk_data_center = dc.iddata_center
where a.medida = '%'
group by dc.nome
order by tempo_medio_resolucao desc
limit 3;

-- últimas 24 horas
select * from vw_resolucao_medio_datacenter
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 24 hour
    group by dc.nome
)
order by tempo_medio_resolucao desc;

-- últimos 7 dias
select * from vw_resolucao_medio_datacenter
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 7 day
    group by dc.nome
)
order by tempo_medio_resolucao desc;

-- últimos 30 dias
select * from vw_resolucao_medio_datacenter
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 30 day
    group by dc.nome
)
order by tempo_medio_resolucao desc;

-- view total de alertas por data center
create or replace view vw_total_alertas_datacenter as
select
    dc.nome as data_center,
    count(a.idalerta) as total_alertas
from alerta a
join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
join servidor_cliente s on p.fk_servidor = s.idservidor
join data_center dc on s.fk_data_center = dc.iddata_center
where a.medida = '%'
group by dc.nome
order by total_alertas desc;

-- últimas 24 horas
select * from vw_total_alertas_datacenter
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 24 hour
    group by dc.nome
)
order by total_alertas desc;

-- últimos 7 dias
select * from vw_total_alertas_datacenter
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 7 day
    group by dc.nome
)
order by total_alertas desc;

-- últimos 30 dias
select * from vw_total_alertas_datacenter
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 30 day
    group by dc.nome
)
order by total_alertas desc;

-- view alertas acima de 5min
create or replace view vw_alertas_acima_5min as
select
    dc.nome as data_center,
    count(a.idalerta) as total_alertas_acima_5min
from alerta a
join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
join servidor_cliente s on p.fk_servidor = s.idservidor
join data_center dc on s.fk_data_center = dc.iddata_center
where a.medida = '%' and timestampdiff(minute, a.data_gerado, a.data_resolvido) > 5
group by dc.nome
order by total_alertas_acima_5min desc;

-- últimas 24 horas
select * from vw_alertas_acima_5min
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 24 hour
    group by dc.nome
)
order by total_alertas_acima_5min desc;

-- últimos 7 dias
select * from vw_alertas_acima_5min
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 7 day
    group by dc.nome
)
order by total_alertas_acima_5min desc;

-- últimos 30 dias
select * from vw_alertas_acima_5min
where data_center in (
    select dc.nome
    from alerta a
    join parametro_servidor p on a.fk_parametro = p.idparametros_servidor
    join servidor_cliente s on p.fk_servidor = s.idservidor
    join data_center dc on s.fk_data_center = dc.iddata_center
    where a.medida = '%' and a.data_gerado >= now() - interval 30 day
    group by dc.nome
)
order by total_alertas_acima_5min desc;
