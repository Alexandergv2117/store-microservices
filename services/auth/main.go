package main

import (
	"github.com/Alexandergv2117/store/src/config"
	"github.com/Alexandergv2117/store/src/models"
	"github.com/Alexandergv2117/store/src/routes"
	"github.com/gofiber/fiber/v2"
)

type TokenRequest struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

func GetUsersHandler(c *fiber.Ctx) error {
	data := TokenRequest{}

	if err := c.BodyParser(&data); err != nil {
		return err
	}

	// token := services.GenerateToken(data.Email)
	var users []models.User
	result := config.DB.Find(&users)
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
	config.DBConmnection()

	// db.DB.AutoMigrate(models.User{}, models.Role{})

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	app.Post("/token", GetUsersHandler)
	app.Get("/user", GetUsersHandler)

	// Routes

	routes.AuthRoutes(app)

	app.Listen(":5000")
}
