import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../services/usuario.service';
import { PedidoService } from '../services/pedido.service';
import { PedidoDTO } from '../features/model/pedido-dto.model';
import { PedidoDetalleDTO } from '../features/model/pedido-detalle-dto.model';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-perfil',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  usuario: Usuario = {
    id: 0,
    nombre: '',
    email: ''
  };

  pedidos: PedidoDTO[] = [];
  detallePedido: PedidoDetalleDTO | null = null;

  editMode = false;

  constructor(
    private usuarioService: UsuarioService,
    private pedidoService: PedidoService,
    private authService: AuthService,
    private router: Router
  ) { }

  
ngOnInit(): void {
  const raw = localStorage.getItem('userProfile');
  console.log('raw userProfile:', raw);
  
  const localUser = raw ? JSON.parse(raw) : null;
  console.log('parsed localUser:', localUser);

  if (localUser && localUser.id > 0) {
    this.usuarioService.getUsuario(localUser.id).subscribe({
      next: (data) => {
        this.usuario = data;
        this.cargarPedidos();
      },
      error: (err) => console.error('Error cargando usuario', err)
    });
  } else {
    console.error('El usuario en el localStorage no tiene un id valido');
  }
}


cargarPedidos(): void {
  this.pedidoService.getPedidosUsuario(this.usuario.id).subscribe({
    next: (res) => {
      console.log('Pedidos recibidos:', res);
      this.pedidos = Array.isArray(res) ? res : [res];
    },
    error: (err) => console.error('Error cargando pedidos', err)
  });
}



  verDetalle(id: number): void {
    this.pedidoService.getDetallePedido(id).subscribe({
      next: (res: PedidoDetalleDTO) => this.detallePedido = res,
      error: (err) => console.error('Error cargando detalles del pedido', err)
    });
  }

  // Edición
  activarEdicion() {
    this.editMode = true;
  }

guardarCambios() {
  // Construir el DTO completo
  const usuarioUpdate = {
    id: this.usuario.id,
    nombre: this.usuario.nombre,
    email: this.usuario.email,
    passwordHash: this.usuario.password ?? '', // obligatorio aunque sea vacío
  };

  console.log('Body enviado al backend:', usuarioUpdate);

  this.usuarioService.updateUsuario(this.usuario.id, usuarioUpdate).subscribe({
    next: (res) => {
      if (res && res.id) {
        this.usuario = res;
        this.authService.setUserProfile(this.usuario);
        alert('Perfil actualizado con éxito ✨');
      } else {
        alert('Error: el backend no devolvió un usuario válido');
      }
      this.editMode = false;
    },
    error: (err) => {
      console.error('Error actualizando usuario', err);
      alert('Hubo un problema al actualizar el perfil');
    }
  });
}

  cerrarSesion() {
    // Eliminar datos guardados
    localStorage.removeItem('userProfile');
    // Elimina el token
    localStorage.removeItem('token');
    // Redirigir al login
    this.router.navigate(['/login']);
  }
}
