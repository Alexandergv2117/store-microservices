package config

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var DSN = "host=postgres-db user=admin password=admin dbname=store_users port=5432"
var DB *gorm.DB

func DBConmnection() {
	var err error
	DB, err = gorm.Open(postgres.Open(DSN), &gorm.Config{})

	if err != nil {
		log.Fatal(err)
	} else {
		log.Println("Database connected")
	}
}
