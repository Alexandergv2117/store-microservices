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

var signinKey = []byte("secret")

func SigninJWT(claim CustomClaims) string {
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

func RefreshToken(tokenString string) (string, error) {
	claims, err := ValidateJWT(tokenString)

	if err != nil {
		return "", err
	}

	claims.ExpiresAt = time.Now().Add(time.Hour * 24).Unix()

	token := jwt.NewWithClaims(jwt.SigningMethodHS256, claims)

	ss, err := token.SignedString(signinKey)

	if err != nil {
		fmt.Println(err)
	}

	return ss, nil
}

func ValidateJWT(tokenString string) (CustomClaims, error) {
	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return signinKey, nil
	})

	if err != nil {
		return CustomClaims{}, err
	}

	claims, ok := token.Claims.(*CustomClaims)

	if !ok {
		return CustomClaims{}, err
	}

	return *claims, nil
}
