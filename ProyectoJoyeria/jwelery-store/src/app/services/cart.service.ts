import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Product } from '../features/model/product.model';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItems: Product[] = []; // productos añadidos
  private cartItemsSubject = new BehaviorSubject<Product[]>([]); // estado del carrito
  cartItems$ = this.cartItemsSubject.asObservable();

  // Añadir producto al carrito
  addItem(product: Product): void {
    const existing = this.cartItems.find(p => p.id === product.id);
    if (existing) {
      existing.quantity = (existing.quantity || 1) + (product.quantity || 1);
    } else {
      this.cartItems.push({ ...product, quantity: product.quantity || 1});
    }
    this.cartItemsSubject.next([...this.cartItems]);
  }

  // Eliminar producto
  removeItem(productId: number): void {
    this.cartItems = this.cartItems.filter(p => p.id !== productId);
    this.cartItemsSubject.next([...this.cartItems]);
  }

  updateQuantity(productId: number, quantity: number): void {
    const item = this.cartItems.find(p => p.id === productId);

    if (item) {
      item.quantity = quantity;
      this.cartItemsSubject.next([...this.cartItems]);
    }
  }

  // Vacial carrito
  clearCart(): void {
    this.cartItems = [];
    this.cartItemsSubject.next([]);
  }

  // Obtener total
  getTotal(): number {
    return this.cartItems.reduce(
      (sum, item) => sum + (item.price * (item.quantity || 1)),
      0
    );
  }
}

