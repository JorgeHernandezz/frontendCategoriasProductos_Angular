import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';
import { Categoria } from '../Model/Categoria';
import { CategoriasService } from '../services/categorias/categorias.service';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-categoria-form',
  standalone: true,
  templateUrl: './categoria-form.component.html',
  imports: [FormsModule],
  styleUrls: ['./categoria-form.component.css']
})
export class CategoriaFormComponent implements OnInit {

 
  constructor(
    private route: ActivatedRoute,
    private categoriasService: CategoriasService,
    private location: Location,
    public dialogRef: MatDialogRef<CategoriaFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { categoria: Categoria }
  ) {}

  ngOnInit(): void {
    
  }



  actualizarCategoria(): void {
    this.categoriasService.actualizarCategoria(this.data.categoria).subscribe({
      next: (response: any) => {
        console.log('Categoría actualizada exitosamente');
        Swal.fire('¡Éxito!', response, 'success');
        this.dialogRef.close(true); // Cerrar el diálogo y pasar true para indicar que se actualizó la categoría
      },
      error: (err) => {
        console.error('Error al actualizar la categoría:', err);
        if (err.status === 200 && err.error.text) {
          Swal.fire('¡Éxito!', err.error.text, 'success');
          this.dialogRef.close(true); // Cerrar el diálogo y pasar true para indicar que se actualizó la categoría
        } else {
          Swal.fire('¡Error!', 'No se pudo actualizar la categoría', 'error');
        }
      }
    });
  }
  

  cerrarDialog(): void {
    this.dialogRef.close(); // Método para cerrar el diálogo
  }







}