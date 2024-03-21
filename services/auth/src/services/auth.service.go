package services

import (
	"github.com/Alexandergv2117/store/src/models"
	"github.com/Alexandergv2117/store/src/repository"
)

func Login(email string, password string) (models.User, error) {

	existUser, err := repository.GetUserByEmail(email)

	if err != nil {
		return models.User{}, err
	}

	return existUser, nil
}
