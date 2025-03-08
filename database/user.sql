CREATE USER 'user_insert'@'%' IDENTIFIED BY 'machineMYDB@01';
GRANT INSERT ON *.* TO 'user_insert'@'%';
FLUSH PRIVILEGES;

CREATE USER 'user_select'@'%' IDENTIFIED BY 'machineMYDB@01';
GRANT SELECT ON *.* TO 'user_select'@'%';
FLUSH PRIVILEGES;