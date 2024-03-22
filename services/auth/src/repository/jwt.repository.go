package repository

import (
	"fmt"
	"time"

	"github.com/golang-jwt/jwt"
)

type CustomClaims struct {
	Id       string `json:"id"`
	Username string `json:"username"`
	Email    string `json:"email"`
	Role     string `json:"role"`
	jwt.StandardClaims
}

func SigninJWT(claim CustomClaims) string {
	signinKey := []byte("secret")

	claims := CustomClaims{
		Id:       claim.Id,
		Username: claim.Username,
		Email:    claim.Email,
		Role:     claim.Role,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 24).Unix(),
			Issuer:    "store",
		},
	}

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	ss, err := token.SignedString(signinKey)

	if err != nil {
		fmt.Println(err)
	}

	return ss
}
