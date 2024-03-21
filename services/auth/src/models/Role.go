package models

type Role struct {
	ID   string `gorm:"primaryKey;type:uuid;not null;unique"`
	Role string `gorm:"not null;unique"`
}
