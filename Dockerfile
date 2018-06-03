FROM postgres:9.6-alpine
COPY create-multiple-postgresql-databases.sh /docker-entrypoint-initdb.d/
EXPOSE 5432