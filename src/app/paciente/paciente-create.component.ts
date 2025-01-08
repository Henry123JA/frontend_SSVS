// src/app/medico/medico-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PacienteService } from '../paciente.service';
import { BitacoraService } from '../bitacora.service';
import { Paciente } from '../model/user.model';

@Component({
  selector: 'app-paciente-create',
  templateUrl: './paciente-create.component.html',
  styleUrls: ['./paciente-create.component.css'],
})
export class PacienteCreateComponent implements OnInit {
  public paciente: Paciente = { id: 0, ci: '', sexo: '', telefono: '',
    user: {id: 0, username: '', email: '', password:'', roles: [],},
    fechaNacimiento: '',codigoAsegurado: ''
  };

  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  public errorMessage: string = ''; 

  constructor(
    public pacienteService: PacienteService,
    public bitacoraService: BitacoraService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Función para manejar la creación del médico
  createPaciente(): void {
    console.log("llego a create paciente .ts", this.paciente);
    this.pacienteService.createPaciente(this.paciente).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        console.log("llego a createpaciente .ts", data);
        this.registrarAccion(this.paciente.user.username);
        this.router.navigate(['/paciente-list']); // Redirigir a la lista de pacientes
      },
      (err) => {
        this.isCreateFailed = true;
        console.log("fallo");
        this.errorMessage = err.error.message;  // Ajusta este campo dependiendo del backend
      }
    );
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `PACIENTE Creado: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
 
}
