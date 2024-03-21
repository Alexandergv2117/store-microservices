package routes

import (
	"github.com/Alexandergv2117/store/src/controllers"
	"github.com/gofiber/fiber/v2"
)

func AuthRoutes(a *fiber.App) {

	// Create route group
	r := a.Group("/auth")

	// Define routes
	r.Post("/login", controllers.Login)
}
