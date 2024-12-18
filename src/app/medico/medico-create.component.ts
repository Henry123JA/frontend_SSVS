// src/app/medico/medico-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MedicoService } from '../medico.service';
import { Medico } from '../model/user.model';

@Component({
  selector: 'app-medico-create',
  templateUrl: './medico-create.component.html',
  styleUrls: ['./medico-create.component.css'],
})
export class MedicoCreateComponent implements OnInit {
  public medico: Medico = { id: 0, ci: '', sexo: '', telefono: '',
    user: {id: 0, username: '', email: '', password:'', roles: [],},
  };

  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  public errorMessage: string = ''; 

  constructor(
    public medicoService: MedicoService,
    private router: Router
  ) {}

  ngOnInit(): void {}

  // Función para manejar la creación del médico
  createMedico(): void {
    console.log("llego a create medico .ts", this.medico);
    this.medicoService.createMedico(this.medico).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        console.log("llego a createmedico .ts", data);
        this.router.navigate(['/medico-list']); // Redirigir a la lista de médicos
      },
      (err) => {
        this.isCreateFailed = true;
        console.log("fallo");
        this.errorMessage = err.error.message;  // Ajusta este campo dependiendo del backend
      }
    );
  }
 
}
