import { ProductosFormComponent } from './../productos-form/productos-form.component';
import { Component, OnInit } from '@angular/core';
import { Producto } from '../Model/producto';
import { ProductosService } from '../services/productos/productos.service';
import Swal from 'sweetalert2';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { ProductoAddComponent } from '../producto-add/producto-add.component';


@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './productos.component.html',
  styleUrls: ['./productos.component.css']
})
export class ProductosComponent implements OnInit {

  titulo: string = 'Productos';
  listaProductos: Producto[] = [];

  constructor(
    private productosService: ProductosService,
    public dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.getProductos();
  }

  getProductos(): void {
    this.productosService.getProductos().subscribe({
      next: (productos) => {
        this.listaProductos = productos;
      },
      error: (err) => {
        console.error('Error al obtener los productos:', err);
      }
    });
  }

  abrirDialogAgregar(): void {
    const dialogRef = this.dialog.open(ProductoAddComponent, {
      width: '600px',
      data: { modo: 'agregar' }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos();
      }
    });
  }

  abrirDialogActualizar(producto: Producto): void {
    const dialogRef = this.dialog.open(ProductosFormComponent, {
      width: '600px',
      data: { modo: 'actualizar', producto }
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.getProductos(); // Actualizar la lista después de actualizar el producto
      }
    });
  }
  
  

  eliminarProducto(id: number): void {
    Swal.fire({
      title: '¿Estás seguro?',
      text: '¡No podrás revertir esto!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, eliminarlo'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productosService.eliminarProducto(id).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'El producto ha sido eliminado.', 'success');
            this.getProductos(); // Actualizar la lista después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar el producto:', err);
            Swal.fire('¡Error!', 'No se pudo eliminar el producto', 'error');
          }
        });
      }
    });
  }

  

  

}