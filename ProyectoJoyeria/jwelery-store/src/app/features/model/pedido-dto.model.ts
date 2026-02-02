export interface PedidoDTO {
  id: number;
  usuarioId: number;
  fecha: string;
  total: number;
  estado: string;
  productoNombre: string;
  productos: {
    productoId: number;
    cantidad: number;
  }[];
}
