// src/app/especialidad/especialidad-list.component.ts
import { Component, OnInit } from '@angular/core';
import { EspecialidadService } from '../especialidad.service';
import { Especialidad } from '../model/especialidad.model';

import { BitacoraService } from '../bitacora.service';
@Component({
  selector: 'app-especialidad-list',
  templateUrl: './especialidad-list.component.html',
  styleUrls: ['./especialidad-list.component.css']
})
export class EspecialidadListComponent implements OnInit {
  especialidades: Especialidad[] = [];

  constructor(private especialidadService: EspecialidadService,private bitacoraService: BitacoraService ) {}

  ngOnInit(): void {
    this.especialidadService.getEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  borrar(especiali: Especialidad) {
    if (confirm('¿Estás seguro de que deseas eliminar esta especialidad?')) {
      this.especialidadService.deleteEspecialidad(especiali.id).subscribe(
        () => {
          // Filtrar la lista de especialidades para eliminar la especialidad eliminada
          this.especialidades = this.especialidades.filter(
            especialidad => especialidad.id !== especiali.id
          );
          if(especiali.id){
            this.registrarAccion(especiali.nombre);
          }
          alert('Especialidad eliminada con éxito');
        },
        (error) => {
          console.error(error);
          alert('Ocurrió un error al eliminar la especialidad');
        }
      );
    }
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('ELIMINAR', `Especialidad eliminada: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
