// src/app/horario/horario-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HorarioService } from '../horario.service'; 
import { MedicoService } from '../medico.service'; 
import { Medico,Horario } from '../model/user.model';

@Component({
  selector: 'app-horario-create',
  templateUrl: './horario-create.component.html',
  styleUrls: ['./horario-create.component.css'],
})
export class HorarioCreateComponent implements OnInit {
  public horario: Horario = {
    id: 0,
    horaInicio: new Date(),
    horaFin: new Date(),
    duracion: 0,
    diaSemana: '',
    estado: 'activo',
    medico: { id: 0, ci: '', sexo: '', telefono: '',
      user: {id: 0, username: '', email: '', password:'', roles: [],},},
    
     // Asignar el ID del médico correspondiente
  };

  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  public errorMessage: string = '';

  public medicos: Medico[] = [];
  constructor(
    private horarioService: HorarioService,
    public medicoService: MedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.medicoService.getMedicos().subscribe(
        (data) => {
          this.medicos = data; // Asignamos los datos de los médicos
        },
        (error) => {
          console.error('Error al obtener médicos:', error);
        }
      );

  }

  // Función para manejar la creación del horario
  createHorario(): void {
    this.horarioService.createHorario(this.horario).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['/horario-list']);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }
}
