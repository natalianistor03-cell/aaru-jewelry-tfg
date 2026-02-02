import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { PedidoDTO } from '../features/model/pedido-dto.model';
import { PedidoDetalleDTO } from '../features/model/pedido-detalle-dto.model';
import { PedidoResumenDTO } from '../features/model/pedido-resumen-dto.model';
import { CheckoutDTO } from '../features/model/checkout-dto';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private apiUrl = 'https://localhost:7283/api/Pedidos';
  

  constructor(private http: HttpClient) {}

  // Obtener todos los pedidos
  getPedidos(): Observable<PedidoDTO[]> {
    return this.http.get<PedidoDTO[]>(this.apiUrl);
  }

  // Obtener detalles de los pedidos
  getDetallePedido(pedidoId: number): Observable<PedidoDetalleDTO> {
    return this.http.get<PedidoDetalleDTO>(`${this.apiUrl}/detalle/${pedidoId}`);
  }

  // Obtener resumen de un pedido
  getResumenPedido(pedidoId: number): Observable<PedidoResumenDTO> {
    return this.http.get<PedidoResumenDTO>(`${this.apiUrl}/resumen/${pedidoId}`);
  }

  // Obtener pedidos de un usuario concreto
  getPedidosUsuario(usuarioId: number): Observable<PedidoDTO[]> {
    return this.http.get<PedidoDTO[]>(`${this.apiUrl}/usuario/${usuarioId}`);
  }

  // Crear un nuevo pedido
  crearPedido(pedido: PedidoDTO): Observable<PedidoDTO> {
    return this.http.post<PedidoDTO>(this.apiUrl, pedido);
  }

  // Actualizar un pedido
  actualizarPedido(id: number, pedido: PedidoDTO): Observable<void> {
    return this.http.put<void>(`${this.apiUrl}/${id}`, pedido);
  }

  // Eliminar un pedido
  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }

  // Realizar Checkout
  realizarCheckout(dto: CheckoutDTO) {
    return this.http.post(`${this.apiUrl}/checkout`, dto);
  }
}
