CREATE USER 'user_insert'@'%' IDENTIFIED BY 'machineMYDB@01';
GRANT INSERT ON *.* TO 'machine'@'%';
FLUSH PRIVILEGES;

CREATE USER 'user_select'@'%' IDENTIFIED BY 'machineMYDB@01';
GRANT SELECT ON *.* TO 'machine'@'%';
FLUSH PRIVILEGES;