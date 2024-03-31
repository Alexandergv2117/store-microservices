#!/bin/bash

# Mensaje del último commit
COMMIT_MESSAGE=$(git log --format=%B -n 1)

SERVICE=""
PREFIXE=""

# Buscar el prefijo antes del paréntesis
# ^([a-zA-Z]+) -> Busca una o más letras mayúsculas o minúsculas al principio de la cadena
if [[ $COMMIT_MESSAGE =~ ^([a-zA-Z]+) ]]; then
  # El prefijo coincidente estará en la variable especial BASH_REMATCH
  PREFIXE=${BASH_REMATCH[1]}
  echo "Prefijo encontrado: $PREFIXE"

  # Buscar el servicio dentro de los paréntesis
  if [[ $COMMIT_MESSAGE =~ \(.*\) ]]; then
    SERVICE=${BASH_REMATCH[0]:1:-1}
    echo "Texto dentro de paréntesis: $SERVICE"
  else
    echo "No se encontraron paréntesis en la cadena."
  fi

else
  echo "No se encontró un prefijo antes del paréntesis en el mensaje del commit."
fi
