using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace ProyectoJoyeria.Models
{
    public class Pedido
    {
        public int Id { get; set; }

        [Required]
        public int UsuarioId { get; set; }

        [Required(ErrorMessage = "La fecha es obligatoria")]
        public DateTime Fecha { get; set; }

        [Required(ErrorMessage = "El total es obligatorio")]
        [Range(0, double.MaxValue, ErrorMessage = "El total debe ser positivo")]
        public decimal Total { get; set; }

        [Required(ErrorMessage = "El estado es obligatorio")]
        [RegularExpression("Pendiente|Enviado|Entregado",
            ErrorMessage = "El estado debe ser Pendiente, Enviado o Entregado")]
        public string? Estado { get; set; } = "Pendiente";

        // Relación con Usuario
        public Usuario? Usuario { get; set; }

        // Relación con PedidoProducto
        public ICollection<PedidoProducto> PedidoProductos { get; set; } = new List<PedidoProducto>();
    }
}
