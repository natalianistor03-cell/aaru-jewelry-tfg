import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  constructor(private http: HttpClient, private router: Router) {}

  // Datos de inicio de sesión
  onSubmit() {
    const usuario = {
      email: this.email,
      password: this.password
    };

    // Página de login
    this.http.post('https://localhost:7283/api/Auth/login', usuario)
      .subscribe({
        next: (res: any) => {
          console.log('Login correcto', res);
          // Redirigir al perfil
          this.router.navigate(['/perfil']);
        },
        error: (err) => {
          console.error('Error en login', err);
        }
      });
  }
}
