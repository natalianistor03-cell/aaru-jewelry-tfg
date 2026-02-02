import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  onSubmit() {
    const usuario = {
      email: this.email,
      passwordHash: this.password
    };

    this.http.post('https://localhost:7283/api/Auth/login', usuario)
      .subscribe({
        next: (res: any) => {
          console.log('Login correcto', res);

          if (res && res.token) {
            localStorage.setItem('token', res.token);
          }
          if (res && res.user && res.user.id) {
            localStorage.setItem('userProfile', JSON.stringify(res.user));
          } else {
            localStorage.removeItem('userProfile');
          }

          this.router.navigate(['/perfil']);
        },
        error: (err) => {
          console.error('Error en login', err);
          alert('Credenciales incorrectas');
        }
      });
  }

  irAlPerfil() {
    this.router.navigate(['/perfil']);
  }

  irAlRegistro() {
    this.router.navigate(['/registro']);
  }
}
