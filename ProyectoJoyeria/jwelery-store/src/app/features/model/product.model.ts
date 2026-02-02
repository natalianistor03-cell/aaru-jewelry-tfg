// Estructura de productos
export interface Product {
  id: number; // id del producto
  name: string; // nombre
  price: number; // precio 
  image :string; // imagen
  category: 'anillos' | 'pulseras' | 'collares'; // tipo de producto
  sizes?: string[]; // tallas
  size?: string; // talla
  customClass?: string; // mover imagen
  description?: string; // descripción
  quantity?: number; // cantidad
}

