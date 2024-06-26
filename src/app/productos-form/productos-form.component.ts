import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ProductosService } from '../services/productos/productos.service';
import { Producto } from '../Model/producto';
import Swal from 'sweetalert2';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos-form',
  standalone: true,
  templateUrl: './productos-form.component.html',
  imports: [FormsModule],
  styleUrls: ['./productos-form.component.css']
})
export class ProductosFormComponent implements OnInit {

  producto: Producto;

  constructor(
    private productosService: ProductosService,
    private dialogRef: MatDialogRef<ProductosFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.producto = data.producto;
  }

  ngOnInit(): void {
  }

  actualizarProducto(): void {
    this.productosService.actualizarProducto(this.producto).subscribe({
      next: () => {
        Swal.fire('¡Actualizado!', 'El producto ha sido actualizado.', 'success');
        this.dialogRef.close(true); // Cerrar diálogo y enviar señal de éxito
      },
      error: (err) => {
        console.error('Error al actualizar el producto:', err);
        Swal.fire('¡Error!', 'No se pudo actualizar el producto', 'error');
      }
    });
  }

  cerrarDialog(): void {
    this.dialogRef.close(); // Cerrar diálogo sin hacer cambios
  }
}
