using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoJoyeria.Data;
using ProyectoJoyeria.Models;

namespace ProyectoJoyeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidosController : ControllerBase
    {
        private readonly JoyeriaContext _context;

        public PedidosController(JoyeriaContext context)
        {
            _context = context;
        }

        // GET: api/Pedidos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidos()
        {
            return await _context.Pedidos
                .Select(p => new PedidoDTO
                {
                    Id = p.Id,
                    UsuarioId = p.UsuarioId,
                    Fecha = p.Fecha,
                    Total = p.Total,
                    Estado = p.Estado ?? "Pendiente"
                    
                })
                .ToListAsync();
        }

        // GET: api/Pedidos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoDTO>> GetPedido(int id)
        {
            Pedido? pedido = await _context.Pedidos.FindAsync(id);

            if (pedido == null)
            {
                return NotFound();
            }

            var pedidoDTO = new PedidoDTO
            {
                Id = pedido.Id,
                UsuarioId = pedido.UsuarioId,
                Fecha = pedido.Fecha,
                Total = pedido.Total,
                Estado = pedido.Estado ?? "Pendiente"
            };

            return pedidoDTO;
        }

        // PUT: api/Pedidos/5
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedido(int id, Pedido pedido)
        {
            if (id != pedido.Id)
            {
                return BadRequest();
            }

            _context.Entry(pedido).State = EntityState.Modified;

            try
            {
                await _context.SaveChangesAsync();
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!PedidoExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Pedidos
        [HttpPost]
        public async Task<ActionResult<PedidoDTO>> PostPedido(Pedido pedido)
        {
            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            var pedidoDTO = new PedidoDTO
            {
                Id = pedido.Id,
                UsuarioId = pedido.UsuarioId,
                Fecha = pedido.Fecha,
                Total = pedido.Total,
                Estado = pedido.Estado ?? "Pendiente"
            };

            return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedidoDTO);
        }

        // POST: api/Pedidos/checkout
        [HttpPost("checkout")]
        public async Task<ActionResult<PedidoDTO>> Checkout([FromBody] CheckoutDTO dto)
        { 
            if (dto == null || dto.Productos == null || !dto.Productos.Any())
            {
                return BadRequest("El pedido no contiene productos.");
            }

            // entidad pedido
            var pedido = new Pedido
            {
                UsuarioId = dto.UsuarioId,
                Fecha = DateTime.Now,
                Estado = "Pendiente",
                Total = 0,
                PedidoProductos = new List<PedidoProducto>()
            };

            // agregar productos al pedido
            foreach (var item in dto.Productos)
            {
                var producto = await _context.Productos.FindAsync(item.ProductoId);
                if (producto == null)
                {
                    return NotFound($"Producto con ID {item.ProductoId} no encontrado.");
                }
                pedido.PedidoProductos.Add(new PedidoProducto
                {
                    ProductoId = producto.Id,
                    Cantidad = item.Cantidad
                });

                pedido.Total += producto.Precio * item.Cantidad;
            }

            _context.Pedidos.Add(pedido);
            await _context.SaveChangesAsync();

            var pedidoDTO = new PedidoDTO
            {
                Id = pedido.Id,
                UsuarioId = pedido.UsuarioId,
                Fecha = pedido.Fecha,
                Total = pedido.Total,
                Estado = pedido.Estado
            };

            return CreatedAtAction(nameof(GetPedido), new { id = pedido.Id }, pedidoDTO);
        }
            

        // DELETE: api/Pedidos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedido(int id)
        {
            var pedido = await _context.Pedidos.FindAsync(id);
            if (pedido == null)
            {
                return NotFound();
            }

            _context.Pedidos.Remove(pedido);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PedidoExists(int id)
        {
            return _context.Pedidos.Any(e => e.Id == id);
        }

        // GET: api/Pedidos/usuario/5
        [HttpGet("usuario/{usuarioId}")]
        public async Task<ActionResult<IEnumerable<PedidoDTO>>> GetPedidosPorUsuario(int usuarioId)
        {
            var pedidos = await _context.Pedidos
                .Where(p => p.UsuarioId == usuarioId)
                .Select(p => new PedidoDTO
                {
                    Id = p.Id,
                    UsuarioId = p.UsuarioId,
                    Fecha = p.Fecha,
                    Total = p.Total,
                    Estado = p.Estado ?? "Pendiente"
                })
                .ToListAsync();

            if (pedidos.Count == 0)
            {
                return NotFound();
            }

            return Ok(pedidos);
        }

        // GET: api/Pedidos/detalle/5
        [HttpGet("detalle/{pedidoId}")]
        public async Task<ActionResult<PedidoDetalleDTO>> GetDetallePedido(int pedidoId)
        {
            var pedido = await _context.Pedidos
                .Include(p => p.PedidoProductos)
                    .ThenInclude(pp => pp.Producto)
                .FirstOrDefaultAsync(p => p.Id == pedidoId);

            if (pedido == null)
            {
                return NotFound();
            }

            var detalle = new PedidoDetalleDTO
            {
                PedidoId = pedido.Id,
                Fecha = pedido.Fecha,
                TotalPedido = pedido.Total,
                Estado = pedido.Estado ?? "Pendiente",
                Productos = pedido.PedidoProductos.Select(pp => new ProductoEnPedidoDTO
                {
                    NombreProducto = pp.Producto?.Nombre ?? "Producto desconocido",
                    PrecioUnitario = pp.Producto?.Precio ?? 0,
                    Cantidad = pp.Cantidad
                }).ToList()
            };

            return detalle;
        }

        // GET: api/Pedidos/resumen/5
        [HttpGet("resumen/{pedidoId}")]
        public async Task<ActionResult<PedidoResumenDTO>> GetResumenPedido(int pedidoId)
        {
            var pedido = await _context.Pedidos
                .Include(p => p.Usuario)
                .Include(p => p.PedidoProductos)
                    .ThenInclude(pp => pp.Producto)
                .FirstOrDefaultAsync(p => p.Id == pedidoId);

            if (pedido == null)
            {
                return NotFound();
            }

            var resumen = new PedidoResumenDTO
            {
                PedidoId = pedido.Id,
                NombreCliente = pedido.Usuario?.Nombre ?? "Cliente desconocido",
                Fecha = pedido.Fecha,
                TotalPedido = pedido.Total,
                Productos = (pedido.PedidoProductos ?? new List<PedidoProducto>()) .Select(pp => new ProductoEnPedidoDTO
                {
                    NombreProducto = pp.Producto?.Nombre ?? "PRoducto desconocido",
                    PrecioUnitario = pp.Producto?.Precio ?? 0,
                    Cantidad = pp.Cantidad
                }).ToList()
            };

            return resumen;
        }


    }
}

