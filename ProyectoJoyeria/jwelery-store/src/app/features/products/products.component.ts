import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../../services/cart.service';
import { Product } from '../model/product.model';
import { FormsModule } from '@angular/forms';
import { Options } from '@angular-slider/ngx-slider';
import { NgxSliderModule } from '@angular-slider/ngx-slider';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, FormsModule, NgxSliderModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  anillos: Product[] = [];
  pulseras: Product[] = [];
  collares: Product[] = [];

//Filtros
selectedCategory: string = '';
selectedStone: string = '';
selectedMaterial: string = '';
minPrice: number = 100;   // valor inicial del slider mínimo
maxPrice: number = 3000;  // valor inicial del slider máximo

priceOptions: Options = {
  floor: 100,
  ceil: 3000,
  step: 50,
  translate: (value: number): string => {
    return value + ' €';
  }
}

// Filtrado de productos
get filteredProducts(): Product[] {
  return this.products.filter(p =>
    (!this.selectedCategory || p.category === this.selectedCategory) &&
    (!this.selectedMaterial || p.description?.toLowerCase().includes(this.selectedMaterial.toLowerCase())) &&
    (!this.selectedStone || p.description?.toLowerCase().includes(this.selectedStone.toLowerCase())) &&
    (p.price >= this.minPrice) &&
    (p.price <= this.maxPrice)
  );
}

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.products = [
      // Anillos
      { id: 1, name: 'Anillo Zafiro Imperial', price: 750, image: 'assets/img/Anillos/ZafiroImperial.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo en oro blanco de 18k con zafiro y diamantes naturales' },
      { id: 2, name: 'Anillo Reina del Mar', price: 735, image: 'assets/img/Anillos/ReinaDelMar.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo en oro blanco de 18k con aguamarina y diamantes naturales' },
      { id: 3, name: 'Anillo Punto Escarlata', price: 760, image: 'assets/img/Anillos/PuntoEscarlata.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo en oro amarillo de 18k con rubí y diamantes naturales' },
      { id: 4, name: 'Anillo Noche Estrellada', price: 680, image: 'assets/img/Anillos/NocheEstrellada.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo en oro amarillo de 18k con zafiro y diamantes naturales' },
      { id: 5, name: 'Anillo Latido Puro', price: 510, image: 'assets/img/Anillos/LatidoPuro.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo con patron de corazones en oro amarillo con diamantes naturales' },
      { id: 6, name: 'Anillo Flor de Invierno', price: 320, image: 'assets/img/Anillos/FlorDeInvierno.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo fino y sofisticado en oro amarillo con diamantes naturales' },
      { id: 7, name: 'Anillo Eterna Promesa', price: 1560, image: 'assets/img/Anillos/EternaPromesa.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description:'Anillo en oro blanco de 18k con diamantes naturales y brillante central' },
      { id: 8, name: 'Anillo Casino', price: 530, image: 'assets/img/Anillos/Casino.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo en oro amarillo de 18k con diamantes y zafiros naturales' },
      { id: 9, name: 'Anillo Alma Gemela', price: 450, image: 'assets/img/Anillos/AlmaGemela.jpg', category: 'anillos', sizes: ['10', '12', '14', '16'], description: 'Anillo en oro amarillo de 18k con diamante natural en garras' },

      // Pulseras
      { id: 10, name: 'Pulsera Aura de Cristal', price: 250, image: 'assets/img/Pulseras/AuraDeCristal.jpg', category: 'pulseras', sizes: ['16', '18', '19', '20'], description: 'Pulsera rigida abierta en oro amarillo de 18k con diamantes naturales' },
      { id: 11, name: 'Pulsera Circulo Puro', price: 230, image: 'assets/img/Pulseras/CirculoPuro.jpg', category: 'pulseras', sizes: ['16', '18', '19', '20'], description: 'Pulsera rigida con cierre en oro de 18k y diamantes naturales' },
      { id: 12, name: 'Pulsera Instinto Dorado', price: 2300, image: 'assets/img/Pulseras/InstintoDorado.jpg', category: 'pulseras', customClass: 'ajuste-instinto', sizes: ['16', '18', '19', '20'], description: 'Pulsera en oro amarillo de 18k con diamantes y esmeraldas naturales' },
      { id: 13, name: 'Pulsera Jardin Silente', price: 175, image: 'assets/img/Pulseras/JardinSilente.jpg', category: 'pulseras',customClass: 'ajuste-jardin', sizes: ['16', '18', '19', '20'], description: 'Pulsera fina en oro amarillo de 18k con esmeraldas naturales' },
      { id: 14, name: 'Pulsera Punto de Oro', price: 1780, image: 'assets/img/Pulseras/PuntoDeOro.jpg', category: 'pulseras', customClass: 'ajuste-puntooro', sizes: ['16', '18', '19', '20'], description: 'Pulsera compuesta de eslabones redondos en oro amarillo de 18k'},

      // Collares
       { id: 15, name: 'Collar Corona de Bruma', price: 750, image: 'assets/img/Collares/CoronaDeBruma.jpg', category: 'collares', customClass: 'ajuste-corona', sizes: ['40', '45'], description: 'Collar en oro blanco de 18k con aguamarina y diamantes naturales ' },
       { id: 16, name: 'Collar Eterna Dama', price: 740, image: 'assets/img/Collares/EternaDama.jpg', category: 'collares', customClass:'ajuste-dama', sizes: ['40', '45'], description: 'Collar en oro blanco de 18k con zafiro y diamantes naturales' },
       { id: 17, name: 'Collar Glaciar', price: 680, image: 'assets/img/Collares/Glaciar.jpg', category: 'collares', customClass: 'ajuste-glaciar', sizes: ['40', '45', '50'], description: 'Collar en oro blanco de 18k con aguamarina natural con corte ovalado' },
       { id: 18, name: 'Collar Hoja Serena', price: 320, image: 'assets/img/Collares/HojaSerena.jpg', category: 'collares', customClass: 'ajuste-hoja', sizes: ['40', '45', '50'], description: 'Collar con forma de hojas en oro amarillo de 18k acabado mate' },
       { id: 19, name: 'Collar Ruleta', price: 545, image: 'assets/img/Collares/Ruleta.jpg', category: 'collares', customClass: 'ajuste-ruleta', sizes: ['40', '45'], description: 'Collar en oro blanco de 18k con diamantes naturales y brillante central' },
       { id: 20, name: 'Collar Verso Floral', price: 750, image: 'assets/img/Collares/VersoFloral.jpg', category: 'collares', customClass: 'ajuste-verso', sizes: ['40', '45'], description: 'Collar floral en oro blanco de 18k con diamantes naturales' },
    ];

    // Categorias
    this.anillos = this.products.filter(p => p.category === 'anillos');
    this.pulseras = this.products.filter(p => p.category === 'pulseras');
    this.collares = this.products.filter(p => p.category === 'collares');
  }

  // Selector de tallas
  selectedSizes: { [productId: number]: string } = {};

  addToCart(product: Product, selectedSizes: string, event: MouseEvent): void {
    const selectedSize = this.selectedSizes[product.id];
    if (!selectedSize) {
      alert('Por favor seleccione una talla')
      return;
    }


    const productWhitSize = { ...product, size: selectedSize};
    this.cartService.addItem(productWhitSize);
    this.animateToCart(event);

    console.log('Producto recibido: ', product);
  }

  addedToCart: { [key: string]: boolean } = {}

  // Imagen que va hacia el carrito
  animateToCart(event: MouseEvent): void {
    const img = (event.target as HTMLElement).closest('.product-card')?.querySelector('img');
    const cart = document.getElementById('carrito');

    if (!img || !cart) return;

    const clone = img.cloneNode(true) as HTMLElement;
    const imgRect = img.getBoundingClientRect();
    const cartRect = cart.getBoundingClientRect();

    clone.style.position = 'fixed';
    clone.style.left = `${imgRect.left}px`;
    clone.style.top = `${imgRect.top}px`;
    clone.style.width = `${imgRect.width}px`;
    clone.style.height = `${imgRect.height}px`;
    clone.style.transition = 'transform 0.8s ease-in-out, opacity 0.8s ease-in-out';
    clone.style.zIndex = '1000';
    document.body.appendChild(clone);

  // Posición
    const cartX = cartRect.left + cartRect.width / 2 - imgRect.width / 2;
    const cartY = cartRect.top + cartRect.height / 2 - imgRect.height / 2;

    // Clon
    requestAnimationFrame(() => {
      clone.style.transform = `translate(${cartX - imgRect.left}px, ${cartY - imgRect.top}px) scale(0.3)`;
      clone.style.opacity = '0.2';
    });

    // Eliminación clon
    setTimeout(() => document.body.removeChild(clone), 900);
  }
}
