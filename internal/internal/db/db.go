package db

import (
	"log"

	"github.com/IgorLem99/todo-api/internal/models"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var DB *gorm.DB

func Init() {
	var err error
	DB, err = gorm.Open(sqlite.Open("tasks.db"), &gorm.Config{})
	if err != nil {
		log.Fatal("Failed to connect to the database", err)
	}

	DB.AutoMigrate(&models.Task{})
}
