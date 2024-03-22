package controllers

import (
	"fmt"

	"github.com/Alexandergv2117/store/src/services"
	"github.com/gofiber/fiber/v2"
)

type TokenRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func Login(c *fiber.Ctx) error {
	data := TokenRequest{}

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	res, user, code, err := services.Login(data.Email, data.Password)

	if err != nil {
		return c.Status(code).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"accessToken": res,
		"user": fiber.Map{
			"id":       user.ID,
			"username": user.Username,
			"email":    user.Email,
			"role":     user.Role,
			"name":     user.Name,
			"lastname": user.Lastname,
		},
	})
}

func ValidateToken(c *fiber.Ctx) error {
	token := c.Get("Authorization")

	fmt.Println(token)

	if token == "" {
		return c.Status(401).JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	res, err := services.ValidateToken(token)

	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	c.Set("x-user-id", res.Id)
	c.Set("x-user-email", res.Email)
	c.Set("x-user-username", res.Username)
	c.Set("x-user-role", res.Role)

	return c.JSON(res)
}

func RefreshToken(c *fiber.Ctx) error {
	token := c.Get("Authorization")

	if token == "" {
		return c.Status(401).JSON(fiber.Map{
			"message": "unauthorized",
		})
	}

	res, err := services.RefreshToken(token)

	if err != nil {
		return c.Status(401).JSON(fiber.Map{
			"message": err.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"accessToken": res,
	})
}
