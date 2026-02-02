using System.ComponentModel.DataAnnotations;

namespace ProyectoJoyeria.Models
{
    public class LoginRequest
    {
        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es obligatoria")]
        [StringLength(50, MinimumLength = 6, ErrorMessage = "Debe contener entre 6 y 50 caracteres")]
        public string Password { get; set; } = string.Empty;
    }
}

