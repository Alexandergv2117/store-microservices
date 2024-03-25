package repository

import (
	"errors"
	"fmt"
	"time"

	"github.com/Alexandergv2117/store/src/config"
	"github.com/Alexandergv2117/store/src/utils"
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
	signinKey := []byte(config.GetEnv("JWT_SECRET"))
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
	signinKey := []byte(config.GetEnv("JWT_SECRET"))

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
	signinKey := []byte(config.GetEnv("JWT_SECRET"))

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

func ValidateJWTCustom(tokenString string) (CustomClaims, error) {
	buffer, err := utils.ReadFromFile("public.pem")

	if err != nil {
		return CustomClaims{}, err
	}

	verifyKey, err := jwt.ParseRSAPublicKeyFromPEM(buffer)

	if err != nil {
		fmt.Println(err)
	}

	token, err := jwt.ParseWithClaims(tokenString, &CustomClaims{}, func(token *jwt.Token) (interface{}, error) {
		return verifyKey, nil
	})

	if err != nil {
		return CustomClaims{}, err
	}

	claims, ok := token.Claims.(*CustomClaims)

	if !ok {
		return CustomClaims{}, errors.New("no se pudo obtener los datos del token")
	}

	return *claims, nil
}
