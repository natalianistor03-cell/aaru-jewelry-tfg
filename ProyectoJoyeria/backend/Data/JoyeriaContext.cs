using Microsoft.EntityFrameworkCore;
using ProyectoJoyeria.Models;

namespace ProyectoJoyeria.Data
{
    public class JoyeriaContext : DbContext
    {
        public JoyeriaContext(DbContextOptions<JoyeriaContext> options) : base(options) { }

        public DbSet<Producto> Productos { get; set; }
        public DbSet<Usuario> Usuarios { get; set; }
        public DbSet<Pedido> Pedidos { get; set; }

        public DbSet<PedidoDetalle> PedidoDetalles { get; set; }
        public DbSet<PedidoProducto> PedidoProductos { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<PedidoProducto>()
                .HasOne(pp => pp.Pedido)
                .WithMany(p => p.PedidoProductos)
                .HasForeignKey(pp => pp.PedidoId)
                .OnDelete(DeleteBehavior.Restrict);

            modelBuilder.Entity<PedidoProducto>()
                .HasOne(pp => pp.Producto)
                .WithMany(p => p.PedidoProductos)
                .HasForeignKey(pp => pp.ProductoId)
                .OnDelete(DeleteBehavior.Cascade);

            
            modelBuilder.Entity<Usuario>()
                .HasIndex(u => u.Email)
                .IsUnique();
        }
    }
}
