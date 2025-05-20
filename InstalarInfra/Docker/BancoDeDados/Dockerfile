FROM mysql:latest
WORKDIR /
ENV MYSQL_ROOT_PASSWORD=urubu100
COPY script_tradefluxLinux.sql /docker-entrypoint-initdb.d/
EXPOSE 1730

# docker build -f InstalarInfra/Docker/BancoDeDados/Dockerfile -t (Aqui cê coloca o nome que vc quer) SlackProjeto/databaseMySQL
