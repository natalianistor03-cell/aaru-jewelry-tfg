import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

// Frases inicio
export class HomeComponent implements OnInit {
  phrases = [
    'Diseños que trascienden el tiempo',
    'Cada pieza cuenta una historia',
    'El lujo está en los detalles',
    'Joyas que celebran tu esencia',
    'Elegancia hecha a mano'
  ];
  currentPhrase = this.phrases[0];
  index = 0;
  
// Duración
  ngOnInit(): void {
    setInterval(() => {
      this.index = (this.index + 1) % this.phrases.length;
      this.currentPhrase = this.phrases[this.index];
    }, 4000);
  }
}
