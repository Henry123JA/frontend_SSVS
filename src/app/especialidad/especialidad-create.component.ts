// src/app/especialidad/especialidad-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { EspecialidadService } from '../especialidad.service'; // Asegúrate de que el servicio esté importado
import { Especialidad } from '../model/especialidad.model'; // El modelo de especialidad

import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-especialidad-create',
  templateUrl: './especialidad-create.component.html',
  styleUrls: ['./especialidad-create.component.css']
})
export class EspecialidadCreateComponent implements OnInit {
  public especialidad: Especialidad;
  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  public errorMessage: string = ''; 
  isDescriptionRequired: boolean = false;

  constructor(
    public especialidadService: EspecialidadService,
    public bitacoraService: BitacoraService, 
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
        if(this.especialidad){
          this.registrarAccion(this.especialidad.nombre);
        }
        this.router.navigate(['/especialidadlist']);  // Redirige a la lista de especialidades
      },
      error: (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;  // Ajusta este campo dependiendo del backend
      }
    });
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `Especialidad creada: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
