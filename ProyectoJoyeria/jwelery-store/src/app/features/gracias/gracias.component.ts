import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { CartService } from '../../services/cart.service';

@Component({
  selector: 'app-gracias',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './gracias.component.html',
  styleUrls: ['./gracias.component.scss'],
})

// Variables datos desde gracias
export class GraciasComponent {
  name = '';
  method = '';
  methodLabel = '';


// Ruta
  constructor(private router: Router, private cartService: CartService) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state;

    if (state) {
      this.name = state['name'] || 'cliente';
      this.method = state['method'] || '';
    } else {
      const savedState = localStorage.getItem('checkoutState');
      if (savedState) {
        const parsed = JSON.parse(savedState);
        this.name = parsed.name || 'cliente';
        this.method = parsed.method || '';
      }
    }
    this.methodLabel = this.getMethodLabel(this.method); // Traductor método de pago
    this.cartService.clearCart();
  }

// Etiqueta del método de pago
  getMethodLabel(method: string): string {
    switch (method) {
      case 'card': return 'Tarjeta de crédito';
      case 'paypal': return 'PayPal';
      case 'bizum': return 'Bizum';
      case 'transferencia': return 'Transferencia';
      default: return 'Método desconocido';
    }
  }
}



