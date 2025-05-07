FROM mysql:latest
WORKDIR /
ENV MYSQL_ROOT_PASSWORD=urubu100
COPY ../../../SlackProjeto/databaseMySql/script_tradeflux.sql /docker-entrypoint-initdb.d/
EXPOSE 1730
