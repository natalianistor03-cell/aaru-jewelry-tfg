export interface ProductoEnPedidoDTO {
  nombreProducto: string;
  precioUnitario: number;
  cantidad: number;
  subtotal: number; // calculado en backend, pero lo recibes ya listo
}

export interface PedidoDetalleDTO {
  pedidoId: number;
  fecha: string;        
  totalPedido: number;
  estado: string;       // "Pendiente", "Enviado", "Entregado"
  productos: ProductoEnPedidoDTO[];
}
