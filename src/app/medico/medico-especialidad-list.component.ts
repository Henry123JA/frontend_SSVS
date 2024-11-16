// src/app/medico/medico-especialidad-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../medico.service';  // Servicio de médicos
import { EspecialidadService } from '../especialidad.service';  // Servicio de especialidades
import { Medico } from '../model/user.model';
import { Especialidad } from '../model/especialidad.model';  // Modelo de especialidad

@Component({
  selector: 'app-medico-especialidad-list',
  templateUrl: './medico-especialidad-list.component.html',
  styleUrls: ['./medico-especialidad-list.component.css']
})
export class MedicoEspecialidadListComponent implements OnInit {
  medicos: Medico[] = [];
  especialidades: Especialidad[] = [];

  constructor(
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService
  ) {}

  ngOnInit(): void {
    this.loadMedicosConEspecialidades();
    this.loadEspecialidades();
  }

  // Cargar la lista de médicos con sus especialidades
  loadMedicosConEspecialidades(): void {
    this.medicoService.getMedicosConEspecialidades().subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al obtener médicos con especialidades:', error);
      }
    );
  }

  // Cargar la lista de especialidades disponibles
  loadEspecialidades(): void {
    this.especialidadService.getEspecialidades().subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      }
    );
  }

  // Asignar una especialidad a un médico
  asignarEspecialidad(medicoId: number, especialidadId: number): void {
    this.medicoService.assignEspecialidadToMedico(medicoId, especialidadId).subscribe(
      (response) => {
        this.loadMedicosConEspecialidades(); // Recargar la lista después de la asignación
      },
      (error) => {
        console.error('Error al asignar especialidad:', error);
      }
    );
  }

  // Eliminar una especialidad de un médico
  eliminarEspecialidad(medicoId: number, especialidadId: number): void {
    this.medicoService.removeEspecialidadFromMedico(medicoId, especialidadId).subscribe(
      (response) => {
        this.loadMedicosConEspecialidades(); // Recargar la lista después de eliminar
      },
      (error) => {
        console.error('Error al eliminar especialidad:', error);
      }
    );
  }
}
