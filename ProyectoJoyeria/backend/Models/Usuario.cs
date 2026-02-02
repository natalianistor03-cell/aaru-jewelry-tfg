using System.ComponentModel.DataAnnotations;

namespace ProyectoJoyeria.Models
{
    public class Usuario
    {
        public int Id { get; set; }

        [Required(ErrorMessage = "El nombre es obligatorio")]
        [StringLength(100, ErrorMessage = "Máximo 100 caracteres")]
        public string Nombre { get; set; } = string.Empty;

        [Required(ErrorMessage = "El apellido es obligatorio")]
        public string Apellido {  get; set; } = string.Empty;

        [Required(ErrorMessage = "El email es obligatorio")]
        [EmailAddress(ErrorMessage = "Formato de email inválido")]
        public string Email { get; set; } = string.Empty;

        [Required(ErrorMessage = "La contraseña es obligatoria")]
        [StringLength(200, MinimumLength = 6, ErrorMessage = "Debe contener entre 6 y 200 caracteres")]
        public string PasswordHash { get; set; } = string.Empty;

        public string? Direccion { get; set; }
        public string? Telefono { get; set; }
    }
}

