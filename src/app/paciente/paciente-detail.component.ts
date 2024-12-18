// src/app/medico/medico-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../paciente.service';  // Asegúrate de importar tu servicio
import { Paciente } from '../model/user.model';    // Ajusta la ruta si es necesario

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
          console.log("llego a datos: ",paciente); // Asignar los datos del médico al modelo
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
}
