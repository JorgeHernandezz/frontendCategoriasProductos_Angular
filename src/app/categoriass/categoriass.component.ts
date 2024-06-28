import { Component, OnInit } from '@angular/core';
import { Categoria } from '../Model/Categoria';
import { CategoriasService } from '../services/categorias/categorias.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { CategoriaFormComponent } from '../categoria-form/categoria-form.component';
import { CategoriaAddComponent } from '../categoria-add/categoria-add.component';



@Component({
  selector: 'app-categoriass',
  standalone: true,
  imports: [CommonModule, MatDialogModule],
  templateUrl: './categoriass.component.html',
  styleUrl: './categoriass.component.css'
})

export class CategoriassComponent implements OnInit {

  titulo: string = 'Categorias';
  listaCategorias: Categoria[] = [];
  categoria: Categoria = {
    idcategoria: 0,
    nombrecategoria: '',
    descripcioncategoria: '',
    fechacreacion: ''
  };

  constructor(
    private categoriasService: CategoriasService,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.getCategorias();
  }

  getCategorias(): void {
    this.categoriasService.getCategorias().subscribe({
      next: (categorias) => {
        this.listaCategorias = categorias;
      },
      error: (err) => {
        console.error('Error al obtener categorías:', err);
      }
    });
  }

  update(categoria: Categoria): void {
    Swal.fire({
      title: 'Actualizar',
      text: '¿Quieres actualizar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡actualízalo!'
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(CategoriaFormComponent, {
          width: '500px',
          data: { categoria } // Pasar la categoría seleccionada al formulario
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('El modal se cerró');
          // Actualizar la lista de categorías si es necesario
          this.getCategorias();
        });
      }
    });
  }

  agregar(): void {
    Swal.fire({
      title: 'Agregar',
      text: '¿Quieres agregar?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, ¡agregar!'
    }).then((result) => {
      if (result.isConfirmed) {
        const dialogRef = this.dialog.open(CategoriaAddComponent, {
          width: '500px',
          data: {  } // Pasar la categoría seleccionada al formulario
        });

        dialogRef.afterClosed().subscribe(result => {
          console.log('El modal se cerró');
          // Actualizar la lista de categorías si es necesario
          this.getCategorias();
        });
      }
    });
  }


  
  descargarPDF(): void {
    const url = 'https://backend-categoriasproductos-springboot.onrender.com/api/categorias/reporte';
    window.open(url, '_blank');
  }



  eliminar(categoria: Categoria): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: `Está a punto de eliminar la categoría: ${categoria.nombrecategoria}`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.categoriasService.eliminarCategoria(categoria.idcategoria).subscribe({
          next: () => {
            Swal.fire('¡Eliminado!', 'La categoría ha sido eliminada.', 'success');
            this.getCategorias(); // Recargar la lista de categorías después de eliminar
          },
          error: (err) => {
            console.error('Error al eliminar la categoría:', err);
            Swal.fire('¡Error!', 'No se pudo eliminar la categoría', 'error');
          }
        });
      }
    });
  }
}