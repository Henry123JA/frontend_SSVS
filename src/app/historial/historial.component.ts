import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';
import { RecetaService } from '../receta.service';
import { TratamientoService } from '../tratamiento.service';
import { ExamenService } from '../examen.service';
import { Consulta, Receta, Tratamiento, Examen } from '../model/user.model';

@Component({
  selector: 'app-historial',
  templateUrl: './historial.component.html',
  styleUrls: ['./historial.component.css']
})
export class HistorialComponent implements OnInit {
  pacienteId: number = 0;
  historial: Array<{ tipo: string; detalle: any }> = []; // Estructura consolidada para historial

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private consultaService: ConsultaService,
    private recetaService: RecetaService,
    private tratamientoService: TratamientoService,
    private examenService: ExamenService
  ) {}

  ngOnInit(): void {
    this.pacienteId = Number(this.route.snapshot.paramMap.get('id'));
    this.cargarHistorialCompleto();
  }

  cargarHistorialCompleto(): void {
    this.consultaService.getConsultasByPaciente(this.pacienteId).subscribe(
      (consultas: Consulta[]) => {
        consultas.forEach((consulta) => {
          // Agregar consulta al historial
          this.historial.push({ tipo: 'Consulta', detalle: consulta });

          // Cargar Receta asociada a la consulta
          this.recetaService.getRecetaByConsulta(consulta.id).subscribe(
            (receta: Receta) => {
              this.historial.push({ tipo: 'Receta', detalle: receta });
            },
            (error) => console.error('Error al obtener receta', error)
          );

          // Cargar Tratamiento asociado a la consulta
          this.tratamientoService.getTratamientoByConsulta(consulta.id).subscribe(
            (tratamiento: Tratamiento) => {
              this.historial.push({ tipo: 'Tratamiento', detalle: tratamiento });
            },
            (error) => console.error('Error al obtener tratamiento', error)
          );

          // Cargar Exámenes asociados a la consulta
          this.examenService.getExamenesBy2Consulta(consulta.id).subscribe(
            (examenes: Examen[]) => {
              examenes.forEach((examen) => {
                console.log("getExamen...",examen);
                this.historial.push({ tipo: 'Examen', detalle: examen });
              });
            },
            (error) => console.error('Error al obtener exámenes', error)
          );
        });
      },
      (error) => console.error('Error al obtener consultas', error)
    );
  }

  getDescripcion(item: { tipo: string; detalle: any }): string {
    switch (item.tipo) {
      case 'Consulta':
        return item.detalle.sintomas || 'Sin descripción';
      case 'Receta':
        return item.detalle.medicamentos || 'Sin descripción';
      case 'Tratamiento':
        return item.detalle.descripcion || 'Sin descripción';
      case 'Examen':
        return item.detalle.tipoExamen || 'Sin descripción';
      default:
        return 'N/A';
    }
  }

  getNotas(item: { tipo: string; detalle: any }): string {
    switch (item.tipo) {
      case 'Consulta':
        return item.detalle.notas || 'Sin notas';
      case 'Receta':
        return item.detalle.indicaciones || 'Sin notas';
      case 'Tratamiento':
        return item.detalle.seguimiento || 'Sin notas';
      case 'Examen':
        return item.detalle.resultados || 'Sin notas';
      default:
        return 'N/A';
    }
  }

  goBackToList(): void {
    this.router.navigate(['/paciente-list']); // Navegar a la lista de pacientes
  }
}
