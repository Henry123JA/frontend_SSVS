// src/app/medico/medico-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';  // Importamos el servicio de médicos
import { Paciente } from '../model/user.model';  // Modelo de médico

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {
  public pacientes: Paciente[] = [];

  constructor(public pacienteService: PacienteService) {}

  ngOnInit(): void {
    this.loadPacientes();  // Cargar los médicos cuando se inicializa el componente
  }

  // Obtener la lista de médicos
  loadPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data; // Asignamos los datos de los médicos
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }

  // Eliminar un médico
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.deletePaciente(id).subscribe(
        () => {
          this.loadPacientes();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar paciente:', error);
        }
      );
    }
  }
}
