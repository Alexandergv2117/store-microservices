#!/bin/bash
IFS=',' read -ra DB_ARRAY <<< "$DATABASES"

# Iterar sobre cada base de datos y crearlas si no existen
for db_name in "${DB_ARRAY[@]}"; do
  echo "Creando la base de datos $db_name si no existe..."
  if ! createdb -U $POSTGRES_USER -E UTF8 $db_name; then
    echo "Error: No se pudo crear la base de datos $db_name."
    exit 1
  else
    echo "La base de datos $db_name se creó correctamente."
  fi
done

# Restaurar db1
psql -U $POSTGRES_USER -d store_users -f ./backup/backup_users.sql
if [ $? -eq 0 ]; then
  echo "La restauración de la base de datos store_users fue exitosa."
else
  echo "Error: No se pudo restaurar la base de datos store_users."
fi

# Restaurar db2
psql -U $POSTGRES_USER -d store_products -f ./backup/backup_products.sql
if [ $? -eq 0 ]; then
  echo "La restauración de la base de datos store_products fue exitosa."
else
  echo "Error: No se pudo restaurar la base de datos store_products."
fi
