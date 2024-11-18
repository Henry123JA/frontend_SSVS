// src/app/paciente/paciente-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../model/user.model'; // Ajusta el modelo

@Component({
  selector: 'app-paciente-detail',
  templateUrl: './paciente-detail.component.html',
  styleUrls: ['./paciente-detail.component.css'],
})
export class PacienteDetailComponent implements OnInit {
  paciente: Paciente | null = null;
  errorMessage: string = '';

  constructor(
    private pacienteService: PacienteService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    const pacienteId = this.route.snapshot.paramMap.get('id');
    if (pacienteId) {
      this.pacienteService.getPacienteById(Number(pacienteId)).subscribe({
        next: (paciente) => {
          this.paciente = paciente;
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar los datos del paciente.';
          console.error(err);
        },
      });
    }
  }

  goBackToList(): void {
    this.router.navigate(['/paciente-list']);
  }
}