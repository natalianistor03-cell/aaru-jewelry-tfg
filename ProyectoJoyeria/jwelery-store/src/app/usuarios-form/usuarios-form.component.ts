import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UsuarioService, Usuario } from '../services/usuario.service';

@Component({
  selector: 'app-usuarios-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './usuarios-form.component.html',
  styleUrls: ['./usuarios-form.component.scss']
})
export class UsuariosFormComponent {
  nuevoUsuario: Usuario = { id: 0, nombre: '', email: '' };

  constructor(private usuarioService: UsuarioService) {}

  crearUsuario() {
    this.usuarioService.crearUsuario(this.nuevoUsuario).subscribe(usuarioCreado => {
      alert(`Usuario creado: ${usuarioCreado.nombre}`);
      this.nuevoUsuario = { id: 0, nombre: '', email: '' }; // limpiar formulario
    });
  }
}

