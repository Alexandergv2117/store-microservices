#!/bin/bash

# Establecer la ruta predeterminada
ruta_archivos_default="../services/auth"

# Verificar si se proporciona una ruta como argumento
if [ $# -eq 0 ]; then
    # Si no se proporciona ninguna ruta, utilizar la ruta predeterminada
    ruta_archivos="$ruta_archivos_default"
else
    # Si se proporciona una ruta como argumento, utilizar esa ruta
    ruta_archivos="$1"
fi

# Generar la clave privada
openssl genrsa -out "$ruta_archivos/private.pem" 2048

# Imprimir el contenido de la clave privada
# echo "Contenido de private.pem:"
# cat "$ruta_archivos/private.pem"
# echo

# Generar la clave pública a partir de la clave privada
openssl rsa -pubout -in "$ruta_archivos/private.pem" -out "$ruta_archivos/public.pem"

# # Imprimir el contenido de la clave pública
# echo "Contenido de public.pem:"
# cat "$ruta_archivos/public.pem"

echo "Done!"
