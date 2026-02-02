import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../../features/model/product.model';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule, FormsModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems: Product[] = []; // Array productos

  // Servicios del carrito
  constructor(public cartService: CartService) {
  this.cartService.cartItems$.subscribe(items => {
    this.cartItems = items;
  });
  }

  // Cantidad
  cambiarCantidad(id: number, nuevaCantidad: number): void {
  this.cartService.updateQuantity(id, nuevaCantidad);
}


  // Vaciar carrito
  clearCart(): void {
    this.cartService.clearCart();
  }

  // Calcular el precio
  getTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 1)), 0
   );
  }
}
