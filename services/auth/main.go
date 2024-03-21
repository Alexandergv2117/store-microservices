package main

import (
	db "github.com/Alexandergv2117/store/src/database"
	"github.com/Alexandergv2117/store/src/models"
	"github.com/gofiber/fiber/v2"
)

type TokenRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func handleToken(c *fiber.Ctx) error {
	data := TokenRequest{}

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// token := services.GenerateToken(data.Email)

	var users []models.User
	result := db.DB.Find(&users)
	if result.Error != nil {
		return c.Status(500).JSON(fiber.Map{
			"error": result.Error.Error(),
		})
	}

	return c.JSON(fiber.Map{
		"users": users,
	})
}

func main() {
	db.DBConmnection()

	// db.DB.AutoMigrate(models.User{}, models.Role{})

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Post("/token", handleToken)
	app.Get("/user", handleToken)

	app.Listen(":5000")
}
