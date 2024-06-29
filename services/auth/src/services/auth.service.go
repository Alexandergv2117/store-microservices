package services

import (
	"errors"
	"strings"

	"github.com/Alexandergv2117/store/src/repository"
)

func Login(email string, password string) (string, repository.UserRepository, int, error) {
	existUser, err := repository.GetUserByEmail(email)

	if err != nil || existUser.Email == "" {
		return "", existUser, 404, errors.New("email not found")
	}

	if !repository.ComparePasswords(existUser.Password, password) {
		return "", existUser, 400, errors.New("invalid password")
	}

	token := repository.SigninJWT(repository.CustomClaims{
		Id:       existUser.ID,
		Username: existUser.Username,
		Email:    existUser.Email,
		Role:     existUser.Role,
	})

	return token, existUser, 200, nil
}

func ValidateToken(token string) (repository.CustomClaims, error) {
	parts := strings.Split(token, " ")

	if len(parts) != 2 {
		return repository.CustomClaims{}, errors.New("token mal formado")
	}

	tokenWituotBearer := parts[1]

	return repository.ValidateJWT(tokenWituotBearer)
}

func RefreshToken(token string) (string, error) {
	claims, err := ValidateToken(token)

	if err != nil {
		return "", err
	}

	return repository.SigninJWT(claims), nil
}
