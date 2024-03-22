package services

import (
	"errors"

	"github.com/Alexandergv2117/store/src/repository"
)

func Login(email string, password string) (string, repository.UserRepository, int, error) {
	existUser, err := repository.GetUserByEmail(email)

	if err != nil {
		return "", existUser, 404, err
	}

	if !repository.ComparePasswords(existUser.Password, password) {
		return "", existUser, 400, errors.New("la contraseña proporcionada no es válida")
	}

	token := repository.SigninJWT(repository.CustomClaims{
		Id:       existUser.ID,
		Username: existUser.Username,
		Email:    existUser.Email,
		Role:     existUser.Role,
	})

	return token, existUser, 200, nil
}
