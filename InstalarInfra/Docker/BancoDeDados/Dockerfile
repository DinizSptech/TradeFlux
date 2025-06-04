FROM mysql:8.0

WORKDIR /bd

# Remova esta linha
ENV MYSQL_ROOT_PASSWORD=urubu100
ENV MYSQL_DATABASE=tradeflux
ENV MYSQL_USER=user_insert_tradeflux
ENV MYSQL_PASSWORD=tradeflux_inser

COPY ./script_tradeflux.sql /docker-entrypoint-initdb.d/

EXPOSE 3306