using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace ProyectoJoyeria.Models
{
    public class PedidoDetalle
    {
        public int Id { get; set; }

        [Required]
        public int PedidoId { get; set; }

        [ForeignKey(nameof(PedidoId))]
        public Pedido Pedido { get; set; } = null!;

        [Required]
        [StringLength(200)]
        public string NombreProducto { get; set; } = string.Empty;

        [Required]
        public decimal PrecioUnitario { get; set; }

        [Required]
        public int Cantidad { get; set; }

        // Este campo se calcula automáticamente
        [NotMapped]
        public decimal Subtotal => PrecioUnitario * Cantidad;
    }
}
