// src/app/medico/medico-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../paciente.service';  // Asegúrate de importar tu servicio
import { Paciente } from '../model/user.model';    
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css'],
}) //Paciente-detail.component
export class PacienteDetailComponent implements OnInit {
  public paciente: Paciente | null = null;
  public errorMessage: string = '';

  constructor(
    public pacienteService: PacienteService,
    public bitacoraService: BitacoraService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del médico desde la URL
    const pacienteId = this.route.snapshot.paramMap.get('id');
    if (pacienteId) {
      this.pacienteService.getPacienteById(Number(pacienteId)).subscribe({
        next: (paciente) => {
          this.paciente = paciente; 
          console.log("llego a datos: ",paciente); 
          this.registrarAccion(this.paciente.user.username);
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar los datos del paciente.';
          console.error(err);
        }
      });
    }else{
        console.log("se vino por falso...");
    }
  }

  goBackToList(): void {
    this.router.navigate(['/paciente-list']);  // Navegar a la lista de médicos
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('VISTO', `PACIENTE Visteado: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
