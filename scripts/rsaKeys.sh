#!/bin/bash

# Establecer la ruta predeterminada
default_dir="../services/auth"

# Verificar si se proporciona una ruta como argumento
if [ $# -eq 0 ]; then
    # Si no se proporciona ninguna ruta, utilizar la ruta predeterminada
    dir_files="$default_dir"
else
    # Si se proporciona una ruta como argumento, utilizar esa ruta
    dir_files="$1"
fi

# Generar la clave privada
openssl genrsa -out "$dir_files/private.pem" 2048

# Imprimir el contenido de la clave privada
# echo "Contenido de private.pem:"
# cat "$ruta_archivos/private.pem"
# echo

# Generar la clave pública a partir de la clave privada
openssl rsa -pubout -in "$dir_files/private.pem" -out "$dir_files/public.pem"

# # Imprimir el contenido de la clave pública
# echo "Contenido de public.pem:"
# cat "$ruta_archivos/public.pem"

echo "Done!"
