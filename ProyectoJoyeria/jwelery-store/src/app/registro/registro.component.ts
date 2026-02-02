import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, CommonModule,],
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent {
  usuario = { nombre: '', apellido: '', email: '', passwordHash: '' };
  confirmPassword: string = '';

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit() {
    const password = this.usuario.passwordHash;
    const regex = /^(?=.*[A-Z])(?=.*[!@#$%^&*(),.?":{}|<>]).{6,}$/;

    if (!regex.test(password)) {
      alert('La contraseña debe tener al menos 6 caracteres, una mayúscula y un carácter especial.');
      return;
    }

    if (password !== this.confirmPassword) {
      alert ('La contraseña no coincide');
      return;
    }

    this.authService.register(this.usuario).subscribe({
      next: (res: any) => {
        localStorage.setItem('token', res.token);
        localStorage.setItem('user', JSON.stringify(res.user));

        alert('Registro exitoso');
        this.router.navigate(['/perfil'])
      },
      error: (err) => {
        alert('Error en el registro');
        console.error(err);
      }
    })
  }
}


