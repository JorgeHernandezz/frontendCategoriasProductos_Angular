// productos.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Producto } from '../../Model/producto';
import { Categoria } from '../../Model/Categoria';

@Injectable({
  providedIn: 'root'
})
export class ProductosService {
  

  apiUrlactualizar: string = 'https://backend-categoriasproductos-springboot.onrender.com/apiProducto';
  apiUrl: string = 'https://backend-categoriasproductos-springboot.onrender.com/apiProducto/productos';
  apiUrlCategorias: string = 'https://backend-categoriasproductos-springboot.onrender.com/api/categorias';

  constructor(private httpClient: HttpClient) { }

  getProductos(): Observable<Producto[]> {
    return this.httpClient.get<Producto[]>(this.apiUrl);
  }

  agregarProducto(nuevoProducto: any): Observable<Producto> {
    return this.httpClient.post<Producto>(this.apiUrl, nuevoProducto);
  }

  obtenerCategorias(): Observable<Categoria[]> {
    return this.httpClient.get<Categoria[]>(this.apiUrlCategorias);
  }


  eliminarProducto(id: number): Observable<any> {
    const url = `${this.apiUrl}/eliminar/${id}`;
    return this.httpClient.delete(url);
  }

  actualizarProducto(producto: Producto): Observable<Producto> {
    return this.httpClient.put<Producto>(`${this.apiUrlactualizar}/productos/${producto.idproducto}`, producto);
  }
}
