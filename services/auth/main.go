package main

import (
	"github.com/Alexandergv2117/store/src/config"
	"github.com/Alexandergv2117/store/src/routes"
	"github.com/gofiber/fiber/v2"
)

func main() {
	config.DBConmnection()

	app := fiber.New()

	app.Get("/", func(c *fiber.Ctx) error {
		return c.SendString("Hello, World!")
	})

	// Routes

	routes.AuthRoutes(app)

	app.Listen(":5000")
}
