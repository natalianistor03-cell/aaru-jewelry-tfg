import { Component, OnInit } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { CartService } from './services/cart.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterModule, RouterOutlet, CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App implements OnInit {
  cartCount = 0; // numero de productos en el carrito
  searchTerm: string = ''; // término de busqueda

// Servicio de carrito
  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartCount = items.length;
      this.animateCartCount();
    });
  }

  animateCartCount(): void {
    const countEl = document.querySelector('.cart-count');
    if (!countEl) return;

    countEl.classList.add('bump');
    setTimeout(() => countEl.classList.remove('bump'), 300);
  }

}

