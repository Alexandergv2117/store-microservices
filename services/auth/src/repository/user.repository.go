package repository

import (
	"github.com/Alexandergv2117/store/src/config"
)

type UserRepository struct {
	ID        string `gorm:"primaryKey;type:uuid;" json:"id"`
	Username  string `gorm:"not null;unique;" json:"username"`
	Password  string `gorm:"not null;" json:"password"`
	Name      string `gorm:"not null;" json:"name"`
	Lastname  string `gorm:"not null;" json:"lastname"`
	Image     string `gorm:"not null;" json:"image"`
	Email     string `gorm:"not null;unique;" json:"email"`
	Phone     string `gorm:"not null;unique;" json:"phone"`
	RoleID    string `gorm:"not null;" json:"role_id"` // Asegura que este campo corresponde a la FK
	Role      string `gorm:"not null;" json:"role"`
	CreatedAt string `gorm:"not null;" json:"created_at"`
	UpdatedAt string `gorm:"not null;" json:"updated_at"`
}

func GetUserByEmail(email string) (UserRepository, error) {
	var user UserRepository

	query := `
		SELECT 
			* 
		FROM 
			users 
		LEFT JOIN 
			roles ON users.role_id = roles.id 
		WHERE
			email = ?
		`

	res := config.DB.Raw(query, email).Scan(&user)

	return user, res.Error
}
