namespace ProyectoJoyeria.Models
{
    public class PedidoDetalleDTO
    {
        public int PedidoId { get; set; }
        public DateTime Fecha { get; set; }
        public decimal TotalPedido { get; set; }

        public string Estado { get; set; } = "Pendiente";

        public List<ProductoEnPedidoDTO> Productos { get; set; } = new();
    }

    public class ProductoEnPedidoDTO
    {
        public string NombreProducto { get; set; } = string.Empty;
        public decimal PrecioUnitario { get; set; }
        public int Cantidad { get; set; }
        public decimal Subtotal => PrecioUnitario * Cantidad;
    }
}
