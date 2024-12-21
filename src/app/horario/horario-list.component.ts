import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service'; 
import { MedicoService } from '../medico.service'; 
import { Horario } from '../model/user.model';    // Modelo de horario

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrls: ['./horario-list.component.css']
})
export class HorarioListComponent implements OnInit {
  public horarios: Horario[] = [];

  constructor(public horarioService: HorarioService,public medicoService: MedicoService) {}

  ngOnInit(): void {
    this.loadHorarios();  // Cargar los horarios cuando se inicializa el componente
  }

  // Obtener la lista de horarios
  loadHorarios(): void {
    this.horarioService.getHorarios().subscribe(
      (data) => {
        this.horarios = data; // Asignamos los datos de los horarios
      },
      (error) => {
        console.error('Error al obtener horarios:', error);
      }
    );
  }

  // Eliminar un horario
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.horarioService.deleteHorario(id).subscribe(
        () => {
          this.loadHorarios();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar horario:', error);
        }
      );
    }
  }
}
