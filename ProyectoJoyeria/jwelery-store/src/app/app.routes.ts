import { Routes } from '@angular/router';
import { HomeComponent } from './features/home/home.component';
import { ProductsComponent } from './features/products/products.component'; 
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './features/checkout/checkout.component';
import { GraciasComponent } from './features/gracias/gracias.component';
import { App } from './app';

// Componentes de info
import { EnviosComponent } from './features/envios/envios.component';
import { DevolucionesComponent } from './features/devoluciones/devoluciones.component';
import { ContactoComponent } from './features/contacto/contacto.component';
import { TerminosComponent } from './features/terminos/terminos.component';
import { PrivacidadComponent } from './privacidad/privacidad.component';

// Componente usuario
import { UsuariosComponent } from './usuarios/usuarios.component';
import { UsuariosFormComponent } from './usuarios-form/usuarios-form.component';
import { RegistroComponent } from './registro/registro.component';
import { LoginComponent } from './login/login.component';
import { authGuard } from './auth-guard';
import { PerfilComponent } from './perfil/perfil.component';

export const routes: Routes = [
  { path: '', component: HomeComponent, title: 'Inicio' },
  { path: 'productos', component: ProductsComponent, title: 'Productos' },
  { path: 'carrito', component: CartComponent, title: 'Carrito'},
  { path: 'checkout', component: CheckoutComponent },
  { path: 'gracias', component: GraciasComponent },

  { path: 'envios', component: EnviosComponent, title: 'Envíos' },
  { path: 'devoluciones', component: DevolucionesComponent, title: 'Devoluciones' },
  { path: 'contacto', component: ContactoComponent, title: 'Contacto' },
  { path: 'terminos', component: TerminosComponent, title: 'Términos' },
  { path: 'privacidad', component: PrivacidadComponent, title: 'Privacidad'},

  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuarios/crear', component: UsuariosFormComponent },
  { path: 'registro', component: RegistroComponent },
  { path: 'login', component: LoginComponent },
  { path: 'perfil', component: PerfilComponent, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },

  
  { path: '**', redirectTo: '' }
];
