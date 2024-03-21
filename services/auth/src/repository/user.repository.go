package repository

import (
	"github.com/Alexandergv2117/store/src/config"
	"github.com/Alexandergv2117/store/src/models"
)

func GetUserByEmail(email string) (models.User, error) {
	var user models.User

	res := config.DB.Where("email = ?", email).First(&user)

	return user, res.Error
}
