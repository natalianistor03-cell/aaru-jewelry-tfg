export interface PedidoResumenDTO {
    pedidoId: number;
    nombreCliente: string;
    fecha: string;
    totalPedido: number;
    productos: ProductoEnPedidoDTO[];
}

export interface ProductoEnPedidoDTO {
    nombreProducto: string;
    precioUnitario: number;
    cantidad: number;
}