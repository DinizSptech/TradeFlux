FROM mysql:8.0

WORKDIR /bd

# Remova esta linha
ENV MYSQL_ROOT_PASSWORD=urubu100

COPY ./script_tradeflux.sql /docker-entrypoint-initdb.d/

EXPOSE 3306