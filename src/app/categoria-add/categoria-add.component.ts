import { Component, Inject, OnInit } from '@angular/core';
import { Categoria } from '../Model/Categoria';
import { CategoriasService } from '../services/categorias/categorias.service';
import { FormsModule, NgForm  } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-add',
  standalone: true,
  templateUrl: './categoria-add.component.html',
  imports: [FormsModule, CommonModule],
  styleUrls: ['./categoria-add.component.css']
})
export class CategoriaAddComponent implements OnInit {

  categoria: Categoria = {
    idcategoria: 0,
    nombrecategoria: '',
    descripcioncategoria: '',
    fechacreacion: ''
  };

  constructor(
    private categoriasService: CategoriasService,
    public dialogRef: MatDialogRef<CategoriaAddComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit(): void {
    this.categoria.fechacreacion = this.getFechaActual();
  }

  getFechaActual(): string {
    const fecha = new Date();
    const year = fecha.getFullYear();
    const month = ('0' + (fecha.getMonth() + 1)).slice(-2);
    const day = ('0' + fecha.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  agregarCategoria(form: NgForm): void {
    if (form.invalid) {
      Object.keys(form.controls).forEach(field => {
        const control = form.control.get(field);
        control?.markAsTouched({ onlySelf: true });
      });
      return;
    }

    this.categoriasService.insertarCategoria(this.categoria).subscribe({
      next: () => {
        Swal.fire('¡Éxito!', 'Categoría agregada exitosamente', 'success');
        this.dialogRef.close(true);
      },
      error: (err) => {
        console.error('Error al agregar la categoría:', err);
        Swal.fire('¡Error!', 'No se pudo agregar la categoría', 'error');
      }
    });
  }

  cerrarDialog(): void {
    this.dialogRef.close();
  }
}
