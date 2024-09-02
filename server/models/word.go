package models

import (
	"gorm.io/gorm"
)

type Word struct {
	gorm.Model
	UserID uint   `json:"user_id"` // Связь с пользователем
	Word   string `json:"word"`    // Слово
}
