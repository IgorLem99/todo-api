package main

import (
	"todo-app/server/router"

	"github.com/gin-gonic/gin"
)

func main() {
	db := database.InitDB() // Инициализация базы данных
	r := gin.Default()
	router.SetupRoutes(r, db) // Настройка маршрутов
	r.Run(":8080")            // Запуск сервера на порту 8080
}
