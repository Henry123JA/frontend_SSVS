import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AntecedenteService } from '../antecedente.service';
import { PacienteService } from '../paciente.service';
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Antecedente, Paciente } from '../model/user.model';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-antecedente-create',
  templateUrl: './antecedente-create.component.html',
  styleUrls: ['./antecedente-create.component.css'],
})
export class AntecedenteCreateComponent implements OnInit {
  public antecedente: Antecedente = {
    id: 0,
    paciente: { id: 0, ci: '', sexo: '', telefono: '', user: { id: 0, username: '', email: '', password: '', roles: [] }, fechaNacimiento: '', codigoAsegurado: '' },
    enfermedadesBase: '',
    enfermedadesHereditarias: '',
    otras: '',
    fecha: '',
  };

  public userId: number = 0;
  public pacientes: Paciente[] = [];
  public errorMessage: string = '';
  public isSuccessful: boolean = false;
  public isCreateFailed: boolean = false;

  constructor(
    private antecedenteService: AntecedenteService,
    private pacienteService: PacienteService,
    public bitacoraService: BitacoraService,
    private router: Router,
    private tokenStorage: TokenStorageService,
    private RoleService: RoleService
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser();
    this.userId = usuario.id;

    // Condición para obtener pacientes dependiendo del rol
    if (this.RoleService.hasRole("ROLE_PACIENTE")) {
      this.pacienteService.getPacientesByUserId(this.userId).subscribe(
        (data) => {
          this.pacientes = data;
        },
        (error) => {
          console.error('Error al obtener pacientes:', error);
        }
      );
    } else {
      this.pacienteService.getPacientes().subscribe(
        (data) => {
          this.pacientes = data;
        },
        (error) => {
          console.error('Error al obtener pacientes:', error);
        }
      );
    }
  }


  // Crear el antecedente médico
  createAntecedente(): void {
    console.log("antecedente: ",this.antecedente);
    this.antecedenteService.createAntecedente(this.antecedente).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.registrarAccion(this.antecedente.paciente.user.username);
        this.router.navigate(['/antecedente-list']);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `CREACION de Antecedente del paciente: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
