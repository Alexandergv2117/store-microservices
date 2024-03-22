package controllers

import (
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
		"token": res,
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
