export interface ProductoCheckoutDTO {
  productoId: number;
  cantidad: number;
}

export interface CheckoutDTO {
  usuarioId: number;
  productos: ProductoCheckoutDTO[];
}
