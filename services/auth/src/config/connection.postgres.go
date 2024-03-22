package config

import (
	"log"

	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

var HOST = GetEnv("DB_HOST")
var USER = GetEnv("DB_USERNAME")
var PASS = GetEnv("DB_PASSWORD")
var DB_NAME = GetEnv("DB_NAME")
var PORT = GetEnv("DB_PORT")

var DSN = "host=" + HOST + " user=" + USER + " password=" + PASS + " dbname=" + DB_NAME + " port=" + PORT
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
