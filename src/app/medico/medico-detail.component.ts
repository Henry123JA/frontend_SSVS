// src/app/medico/medico-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../medico.service';  // Asegúrate de importar tu servicio
import { Medico } from '../model/user.model';    // Ajusta la ruta si es necesario

@Component({
  selector: 'app-medico-detail',
  templateUrl: './medico-detail.component.html',
  styleUrls: ['./medico-detail.component.css'],
}) //paciente-detail.component
export class MedicoDetailComponent implements OnInit {
  public medico: Medico | null = null;
  public errorMessage: string = '';

  constructor(
    public medicoService: MedicoService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del médico desde la URL
    const medicoId = this.route.snapshot.paramMap.get('id');
    if (medicoId) {
      this.medicoService.getMedicoById(Number(medicoId)).subscribe({
        next: (medico) => {
          this.medico = medico; 
          console.log("llego a datos: ",medico); // Asignar los datos del médico al modelo
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar los datos del médico.';
          console.error(err);
        }
      });
    }else{
        console.log("se vino por falso...");
    }
  }

  goBackToList(): void {
    this.router.navigate(['/medico-list']);  // Navegar a la lista de médicos
  }
}
