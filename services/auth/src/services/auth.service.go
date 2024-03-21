package services

import (
	"github.com/Alexandergv2117/store/src/repository"
)

func Login(email string, password string) (repository.UserRepository, error) {

	existUser, err := repository.GetUserByEmail(email)

	if err != nil {
		return repository.UserRepository{}, err
	}

	return existUser, nil
}
