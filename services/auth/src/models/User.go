package models

type User struct {
	ID        string `gorm:"primaryKey;type:uuid;" json:"id"`
	Username  string `gorm:"not null;unique;" json:"username"`
	Password  string `gorm:"not null;" json:"password"`
	Name      string `gorm:"not null;" json:"name"`
	Lastname  string `gorm:"not null;" json:"lastname"`
	Image     string `gorm:"not null;" json:"image"`
	Email     string `gorm:"not null;unique;" json:"email"`
	Phone     string `gorm:"not null;unique;" json:"phone"`
	RoleID    string `gorm:"not null;" json:"role_id"` // Asegura que este campo corresponde a la FK
	CreatedAt string `gorm:"not null;" json:"created_at"`
	UpdatedAt string `gorm:"not null;" json:"updated_at"`
}
