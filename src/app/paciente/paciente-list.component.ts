// src/app/medico/medico-list.component.ts
import { Component, OnInit } from '@angular/core';
import { PacienteService } from '../paciente.service';  // Importamos el servicio de médicos
import { Paciente } from '../model/user.model';  // Modelo de médico
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';

@Component({
  selector: 'app-paciente-list',
  templateUrl: './paciente-list.component.html',
  styleUrls: ['./paciente-list.component.css']
})
export class PacienteListComponent implements OnInit {
  public pacientes: Paciente[] = [];
  public userId: number= 0;

  constructor(public pacienteService: PacienteService,
              public roleService: RoleService,
              public tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if (this.roleService.hasRole("ROLE_ADMIN")) {
      this.loadPacientes();
    } else {

      if (this.roleService.hasRole("ROLE_MEDICO")) {
        this.loadPacientesMed();
      }else{
        this.loadPacient();
      }


    }


      // Cargar los médicos cuando se inicializa el componente
  }
  //getPacientesByUserId

  loadPacient(): void {
    this.pacienteService.getPacientesByUserId(this.userId).subscribe(
      (data) => {
        this.pacientes = data; // Asignamos los datos de los médicos
        console.log("llegoa loadPaciente",this.pacientes);
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }
  // Obtener la lista de médicos
  loadPacientes(): void {
    this.pacienteService.getPacientes().subscribe(
      (data) => {
        this.pacientes = data; // Asignamos los datos de los médicos
      },
      (error) => {
        console.error('Error al obtener pacientes:', error);
      }
    );
  }


  loadPacientesMed(): void {
    this.pacienteService.getPacientesByMedico(this.userId).subscribe(
      (data) => {
        this.pacientes = data;  // Asignamos los datos de las recetas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las recetas del médico:', error);
      }
    );
  }

  // Eliminar un médico
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este paciente?')) {
      this.pacienteService.deletePaciente(id).subscribe(
        () => {
          this.loadPacientes();  
        },
        (error) => {
          console.error('Error al eliminar paciente:', error);
        }
      );
    }
  }
}
