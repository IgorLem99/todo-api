package main

import "github.com/IgorLem99/todo-api/internal/db"
import "github.com/IgorLem99/todo-api/internal/router"


func main() {
	db.Init()
	r := router.SetupRouter()
	r.Run(":8080")
}
