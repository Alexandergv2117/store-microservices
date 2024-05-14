FROM postgres:16.2

ENV POSTGRES_USER=admin
ENV POSTGRES_PASSWORD=admin
ENV POSTGRES_DB=store

COPY backup.sh /docker-entrypoint-initdb.d/

EXPOSE 5432