import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../paciente.service';
import { Paciente } from '../model/user.model';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css'],
})
export class PacienteCreateComponent implements OnInit {
  paciente: Paciente = {
    id: 0,
    ci: '',
    sexo: '',
    telefono: '',
    user: { id: 0, username: '', email: '', password: '', roles: [] },
    // Se eliminan las propiedades de direccion y fechaNacimiento del modelo
  };

  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  errorMessage: string = '';

  constructor(
    private pacienteService: PacienteService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Función para manejar la creación del paciente
  createPaciente(): void {
    this.pacienteService.createPaciente(this.paciente).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['/paciente-list']); // Redirigir a la lista de pacientes
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message; // Ajusta este campo dependiendo del backend
      }
    );
  }
}