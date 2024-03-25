package utils

import "os"

func ReadFromFile(filename string) ([]byte, error) {
	// Abre el archivo
	file, err := os.Open(filename)
	if err != nil {
		return nil, err
	}
	defer file.Close()

	// Obtiene el tamaño del archivo
	fileInfo, err := file.Stat()
	if err != nil {
		return nil, err
	}
	fileSize := fileInfo.Size()

	// Lee el contenido del archivo en un buffer
	buffer := make([]byte, fileSize)
	_, err = file.Read(buffer)
	if err != nil {
		return nil, err
	}

	return buffer, nil
}
