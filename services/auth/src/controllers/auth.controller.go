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

	res, err := services.Login(data.Email, data.Password)

	if err != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": err.Error(),
		})
	}

	return c.JSON(res)
}
