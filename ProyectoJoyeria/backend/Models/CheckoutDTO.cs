namespace ProyectoJoyeria.Models
{
    public class CheckoutDTO
    {
        public int UsuarioId { get; set; }
        public List<ProductoCheckoutDTO> Productos { get; set; }
    }
}



