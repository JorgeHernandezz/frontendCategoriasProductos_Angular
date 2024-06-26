import { Component, OnInit } from '@angular/core';
import { ProductosService } from '../services/productos/productos.service';
import { FormsModule, NgForm  } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { Categoria } from '../Model/Categoria';
import { Producto } from '../Model/producto';
import { CategoriasService } from '../services/categorias/categorias.service';

@Component({
  selector: 'app-producto-add',
  standalone: true,
  templateUrl: './producto-add.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./producto-add.component.css']
})
export class ProductoAddComponent implements OnInit {

  nuevoProducto: Producto = {
    idproducto : 0,
    nombreproducto: '',
    descripcionproducto: '',
    existencia: 0,
    precio: 0,
    idcategoria: {  // Inicializado con un objeto vacío o valores predeterminados
      idcategoria: 0,  // Ejemplo: inicializar con un valor válido
      nombrecategoria: '',
      descripcioncategoria: '',
      fechacreacion: ''
    }
  };

  categorias: Categoria[] = [];

  constructor(
    private productosService: ProductosService,
    private categoriasService: CategoriasService,
    public dialogRef: MatDialogRef<ProductoAddComponent>
  ) {}

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (categorias) => {
        this.categorias = categorias;
      },
      error: (err) => {
        console.error('Error al obtener las categorías:', err);
      }
    });
  }

  agregarProducto(): void {
    this.productosService.agregarProducto(this.nuevoProducto).subscribe({
      next: () => {
        Swal.fire('¡Agregado!', 'El producto ha sido agregado correctamente.', 'success');
        this.dialogRef.close(true);  // Cierra el diálogo y envía true como resultado
      },
      error: (err) => {
        console.error('Error al agregar el producto:', err);
        Swal.fire('¡Error!', 'No se pudo agregar el producto', 'error');
      }
    });
  }

  cerrarDialog(): void {
    this.dialogRef.close();  // Cierra el diálogo sin enviar ningún resultado
  }
}