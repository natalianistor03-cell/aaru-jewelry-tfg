using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ProyectoJoyeria.Data;
using ProyectoJoyeria.Models;

namespace ProyectoJoyeria.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PedidoProductosController : ControllerBase
    {
        private readonly JoyeriaContext _context;

        public PedidoProductosController(JoyeriaContext context)
        {
            _context = context;
        }

        // GET: api/PedidoProductos
        [HttpGet]
        public async Task<ActionResult<IEnumerable<PedidoProducto>>> GetPedidoProductos()
        {
            return await _context.PedidoProductos
                .Include(pp => pp.Pedido)
                .ToListAsync();
        }

        // GET: api/PedidoProductos/5
        [HttpGet("{id}")]
        public async Task<ActionResult<PedidoProducto>> GetPedidoProducto(int id)
        {
            var pedidoProducto = await _context.PedidoProductos
                .Include(pp => pp.Producto)
                .Include(pp => pp.Pedido)
                .FirstOrDefaultAsync(pp => pp.Id == id);

            if (pedidoProducto == null)
            {
                return NotFound();
            }

            return pedidoProducto;
        }

        // POST: api/PedidoProductos
        [HttpPost]
        public async Task<ActionResult<PedidoProducto>> PostPedidoProducto(PedidoProducto pedidoProducto)
        {
            _context.PedidoProductos.Add(pedidoProducto);
            await _context.SaveChangesAsync();

            // Cargar las relaciones para la respuesta
            await _context.Entry(pedidoProducto).Reference(p => p.Pedido).LoadAsync();
            await _context.Entry(pedidoProducto).Reference(p => p.Producto).LoadAsync();

            return CreatedAtAction(nameof(GetPedidoProducto), new { id = pedidoProducto.Id }, pedidoProducto);
        }

        // DELETE: api/PedidoProductos/5
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeletePedidoProducto(int id)
        {
            var pedidoProducto = await _context.PedidoProductos.FindAsync(id);
            if (pedidoProducto == null)
            {
                return NotFound();
            }

            _context.PedidoProductos.Remove(pedidoProducto);
            await _context.SaveChangesAsync();

            return NoContent();
        }

        private bool PedidoProductoExists(int id)
        {
            return _context.PedidoProductos.Any(e => e.Id == id);
        }

        // GET /api/Pedidos/{id}/productos
        [HttpGet("{id}/productos")]
        public async Task<ActionResult<IEnumerable<object>>> GetProductosDelPedido(int id)
        {
            var productos = await _context.PedidoProductos
                .Where(pp => pp.PedidoId == id)
                .Include(pp => pp.Producto)
                .Select(pp => new
                {
                    pp.Producto.Nombre, 
                    pp.Producto.Precio,
                    pp.Cantidad,
                    Subtotal = pp.Producto.Precio * pp.Cantidad
                })
                .ToListAsync();

            if (!productos.Any())
            {
                return NotFound($"No hay productos para el pedido con ID {id}");
            }

            return Ok(productos);
        }

        // PUT /api/PedidoProductos/{id}
        [HttpPut("{id}")]
        public async Task<IActionResult> PutPedidoProducto(int id, PedidoProducto pedidoProducto)
        {
            if (id != pedidoProducto.Id)
            {
                return BadRequest("El ID no coincide");
            }

            var existente = await _context.PedidoProductos.FindAsync(id);
            if (existente == null)
            {
                return NotFound();
            }

            existente.ProductoId = pedidoProducto.ProductoId;
            existente.Cantidad = pedidoProducto.Cantidad;

            await _context.SaveChangesAsync();
            return NoContent();
        }

        // Evitar duplicados
        // POST: api/PedidoProductos/validar
        [HttpPost("validar")]
        public async Task<ActionResult<PedidoProducto>> PostPedidoProductoValidado(PedidoProducto pedidoProducto)
        {
            var existe = await _context.PedidoProductos
                .AnyAsync(pp => pp.PedidoId == pedidoProducto.PedidoId && pp.ProductoId == pedidoProducto.ProductoId);

            if (existe)
            {
                return Conflict("Este producto ya está vinculado al pedido.");
            }

            _context.PedidoProductos.Add(pedidoProducto);
            await _context.SaveChangesAsync();

            await _context.Entry(pedidoProducto).Reference(p => p.Pedido).LoadAsync();
            await _context.Entry(pedidoProducto).Reference(p => p.Producto).LoadAsync();

            return CreatedAtAction(nameof(GetPedidoProducto), new { id = pedidoProducto.Id }, pedidoProducto);
        }



    }
}
