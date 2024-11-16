// src/app/especialidad/especialidad-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecialidadService } from '../especialidad.service'; // Asegúrate de que el servicio esté importado
import { Especialidad } from '../model/especialidad.model'; // El modelo de especialidad

@Component({
  selector: 'app-especialidad-create',
  templateUrl: './especialidad-create.component.html',
  styleUrls: ['./especialidad-create.component.css']
})
export class EspecialidadCreateComponent implements OnInit {
  especialidad: Especialidad;
  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  errorMessage: string = ''; 
  isDescriptionRequired: boolean = false;

  constructor(
    private especialidadService: EspecialidadService, 
    private router: Router
  ) {
    this.especialidad = { id: 0, nombre: '', descripcion: '' }; 
  }

  ngOnInit(): void {}

  createEspecialidad(): void {
    if (!this.especialidad.descripcion || this.especialidad.descripcion.trim().length === 0) {
      this.isDescriptionRequired = true;  // Si no tiene descripción, muestra el error
      return;
    }

    this.isDescriptionRequired = false;
    this.especialidadService.createEspecialidad(this.especialidad).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['/especialidadlist']);  // Redirige a la lista de especialidades
      },
      error: (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;  // Ajusta este campo dependiendo del backend
      }
    });
  }
}
