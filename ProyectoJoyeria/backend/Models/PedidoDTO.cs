namespace ProyectoJoyeria.Models
{
    public class PedidoDTO
    {
        public int Id { get; set; }
        public int UsuarioId { get; set; }
        public DateTime Fecha { get; set; }
        public decimal Total { get; set; }

        public string Estado { get; set; } = "Pendiente";
    }
}
