import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PedidoService } from '../../services/pedido.service';
import { CheckoutDTO } from '../model/checkout-dto';
import { CartService } from '../../services/cart.service';
import { Usuario } from '../../services/usuario.service';

@Component({
  selector: 'app-checkout',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})

export class CheckoutComponent {
  name = '';
  address = '';
  email = '';
  phoneNumber = '';
  paymentMethod = '';
  cardNumber = '';
  cardName = '';
  cardCVV = '';
  isGift = false;
  giftNote = ''; 
  deliveryDate = '';
  shippingType = '';
  usuario!: Usuario;

  modo: 'perfil' | 'invitado' | null = null;
  carrito: any[] = [];

  constructor(
    private router: Router, 
    private pedidoService: PedidoService,
    private cartService: CartService
  ) {}

ngOnInit() {
  const userData = localStorage.getItem('userProfile');
  console.log('Contenido de localStorage userProfile:', userData);

  let user: any = null;
  try {
    if (userData && userData !== 'undefined' && userData !== 'null') {
      user = JSON.parse(userData);
    }
  } catch (e) {
    console.error('Error al parsear userProfile:', e);
  }

  if (user && user.id) {
    this.usuario = user;
    this.name = user.nombre;
    this.email = user.email;
    this.address = user.direccion ?? '';
    this.phoneNumber = user.telefono ?? '';
    this.modo = 'perfil';
  } else {
    console.log('No hay usuario válido en localStorage');
    this.modo = 'invitado';
  }

  this.cartService.cartItems$.subscribe(items => {
    this.carrito = items ?? [];
  });
}


  usarPerfil() {
    this.modo = 'perfil';
  }

  usarInvitado() {
    this.modo = 'invitado';
    this.name = '';
    this.email = '';
    this.address = '';
    this.phoneNumber = '';
  }

  confirmPurchase() {
    if (this.carrito.length === 0) {
      alert('El carrito está vacío');
      return;
    }

    const dto: CheckoutDTO = {
      usuarioId: this.usuario.id ?? 0,
      productos: this.carrito.map(item => ({
        productoId: Number(item.id),
        cantidad: Number (item.quantity)
      }))
    };

    this.pedidoService.realizarCheckout(dto).subscribe({
      next: (res) => {
        console.log('Pedido creado:', res);
        alert('Compra confirmada');
        this.cartService.clearCart(); // vaciar carrito tras compra
        this.router.navigate(['/gracias'], {
          state: {
            name: this.name,
            method: this.paymentMethod
          }
        });
      },
      
      error: (err) => {
        console.error('Error al crear el pedido:', err);
        alert('Hubo un problema al procesar la compra');
      }
    });
  }
}
