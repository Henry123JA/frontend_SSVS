// src/app/medico/medico-list.component.ts
import { Component, OnInit } from '@angular/core';
import { MedicoService } from '../medico.service';  // Importamos el servicio de médicos
import { Medico } from '../model/user.model';  // Modelo de médico

@Component({
  selector: 'app-medico-list',
  templateUrl: './medico-list.component.html',
  styleUrls: ['./medico-list.component.css']
})
export class MedicoListComponent implements OnInit {
  medicos: Medico[] = [];

  constructor(private medicoService: MedicoService) {}

  ngOnInit(): void {
    this.loadMedicos();  // Cargar los médicos cuando se inicializa el componente
  }

  // Obtener la lista de médicos
  loadMedicos(): void {
    this.medicoService.getMedicos().subscribe(
      (data) => {
        this.medicos = data; // Asignamos los datos de los médicos
      },
      (error) => {
        console.error('Error al obtener médicos:', error);
      }
    );
  }

  // Eliminar un médico
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este médico?')) {
      this.medicoService.deleteMedico(id).subscribe(
        () => {
          this.loadMedicos();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar médico:', error);
        }
      );
    }
  }
}
