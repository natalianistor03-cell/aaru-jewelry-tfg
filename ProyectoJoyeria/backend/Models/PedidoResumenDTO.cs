using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ProyectoJoyeria.Models
{
    public class PedidoResumenDTO
    {
        public int PedidoId { get; set; }
        public string NombreCliente { get; set; } = string.Empty;
        public List<ProductoEnPedidoDTO> Productos { get; set; } = new();

        public DateTime Fecha { get; set; }
        public decimal TotalPedido { get; set; }

        public string Estado { get; set; } = "Pendiente";

    }

    public class ProductosEnPedidoDTO
    {
        public string NombreProducto { get; set; } = string.Empty;
        public decimal PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal => PrecioUnitario * Cantidad;
    }
}
