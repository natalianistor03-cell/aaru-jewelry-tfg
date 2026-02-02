using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoJoyeria.Data;
using ProyectoJoyeria.Models;

namespace ProyectoJoyeria.Api.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CheckoutController : ControllerBase
    {
        private readonly JoyeriaContext _context;

        public CheckoutController(JoyeriaContext context)
        {
            _context = context;
        }

        [HttpPost]
        public async Task<IActionResult> RealizarCheckout([FromBody] CheckoutDTO dto)
        {
            if (dto == null || dto.Productos == null || !dto.Productos.Any())
                return BadRequest("El carrito está vacío.");

            // Verificar que el usuario existe
            var usuario = await _context.Usuarios.FindAsync(dto.UsuarioId);
            if (usuario == null)
                return NotFound($"Usuario con ID {dto.UsuarioId} no encontrado.");

            // Calcular total y validar productos
            decimal total = 0;
            foreach (var item in dto.Productos)
            {
                if (item.ProductoId <= 0)
                    return BadRequest($"ProductoId inválido: {item.ProductoId}");

                var producto = await _context.Productos.FindAsync(item.ProductoId);
                if (producto == null)
                    return NotFound($"Producto con ID {item.ProductoId} no encontrado.");

                total += producto.Precio * item.Cantidad;
            }

            // Crear pedido
            var pedido = new Pedido
            {
                UsuarioId = dto.UsuarioId,
                Fecha = DateTime.Now,
                Total = total,
                Estado = "Pendiente"
            };

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync(); // Guardar para obtener el Id del pedido

            // Relacionar productos
            foreach (var item in dto.Productos)
            {
                var relacion = new PedidoProducto
                {
                    PedidoId = pedido.Id,
                    ProductoId = item.ProductoId,
                    Cantidad = item.Cantidad
                };
                _context.PedidoProductos.Add(relacion);
            }

            await _context.SaveChangesAsync();

            // Devolver respuesta con el pedido y productos
            return Ok(new
            {
                PedidoId = pedido.Id,
                pedido.UsuarioId,
                pedido.Fecha,
                pedido.Total,
                pedido.Estado,
                Productos = dto.Productos
            });
        }
    }
}
