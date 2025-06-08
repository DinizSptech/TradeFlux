FROM mysql:8.0

ENV MYSQL_ROOT_PASSWORD=urubu100
ENV MYSQL_DATABASE=tradeflux

COPY ./script_tradeflux.sql /docker-entrypoint-initdb.d/

RUN chmod 644 /docker-entrypoint-initdb.d/script_tradeflux.sql

EXPOSE 3306