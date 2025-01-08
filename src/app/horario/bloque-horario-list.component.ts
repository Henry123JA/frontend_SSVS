import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service';  // Servicio para manejar bloques de horario
import { Router,ActivatedRoute } from '@angular/router';
import { BloqueHorario,Horario } from '../model/user.model';    // Modelo de bloque horario
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-bloque-horario-list',
  templateUrl: './bloque-horario-list.component.html',
  styleUrls: ['./bloque-horario-list.component.css']
})
export class BloqueHorarioListComponent implements OnInit {
  public bloques: BloqueHorario[] = [];  // Array para almacenar los bloques de horario
  public horarioId: number = 0;

  constructor(private bloqueHorarioService: HorarioService,
              private bitacoraService: BitacoraService,
              private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.paramMap.subscribe(params => {
      const horarioId = params.get('horarioId');
      if (horarioId) {
        this.horarioId = +horarioId;  // Convertir el valor a número
        this.loadBloques();  // Llamar a loadBloques después de obtener el horarioId
      }
    });
  }

  // Obtener la lista de bloques de horario
  loadBloques(): void {
    this.bloqueHorarioService.getBloquesByHorarioId(this.horarioId).subscribe(
      (bloques) => {
        this.bloques = bloques;  // Asignar los bloques al array
        this.registrarAccion(this.horarioId);
        console.log('Bloques de horario:', this.bloques);
      },
      (error) => {
        console.error('Error al obtener bloques de horario:', error);
      }
    );
  }

  // Eliminar un bloque de horario
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este bloque de horario?')) {
      this.bloqueHorarioService.deleteBloqueHorario(id).subscribe(
        () => {
          this.loadBloques();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar bloque de horario:', error);
        }
      );
    }
  }

  registrarAccion(name: any): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('VISTO', `VISTEADO del bloque de Horario con Id: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
