import { Component, OnInit } from '@angular/core';
import { HorarioService } from '../horario.service'; 
import { Router } from '@angular/router';
import { MedicoService } from '../medico.service'; 
import { Horario,BloqueHorario } from '../model/user.model';    // Modelo de horario
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-horario-list',
  templateUrl: './horario-list.component.html',
  styleUrls: ['./horario-list.component.css']
})
export class HorarioListComponent implements OnInit {
  public horarios: Horario[] = [];
  public userId: number = 0;

  constructor(public horarioService: HorarioService,
              public medicoService: MedicoService,
              public router: Router,
              public bitacoraService: BitacoraService,
              public roleService: RoleService,
              private tokenStorage: TokenStorageService,) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if (this.roleService.hasRole("ROLE_ADMIN")) {
      //this.loadRecetas();
      this.loadHorarios(); 
    } else {
      if (this.roleService.hasRole("ROLE_MEDICO")) {
        this.loadHorariosMed();
      }

    }



     // Cargar los horarios cuando se inicializa el componente
  }

  // Obtener la lista de horarios
  loadHorarios(): void {
    this.horarioService.getHorarios().subscribe(
      (data) => {
        this.horarios = data; // Asignamos los datos de los horarios
      },
      (error) => {
        console.error('Error al obtener horarios:', error);
      }
    );
  }

  // Obtener la lista de todas las recetas de un médico
  loadHorariosMed(): void {
    this.horarioService.getHorariosByMedico(this.userId).subscribe(
      (data) => {
        this.horarios = data;  // Asignamos los datos de las recetas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las recetas del médico:', error);
      }
    );
  }

  // Eliminar un horario
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este horario?')) {
      this.horarioService.deleteHorario(id).subscribe(
        () => {
          this.loadHorarios();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar horario:', error);
        }
      );
    }
  }

  // Crear bloques para un horario
  crearBloques(horario: Horario): void {
    if (horario.estado=="inactivo") {
      if(confirm('¿Deseas crear bloques para este horario?')){
        this.horarioService.createHorariosConBloques(horario).subscribe(
          (newHorario) => {
            this.registrarAccion(horario.medico.user.username);
            console.log('Bloques creados con éxito:', newHorario);
            this.loadHorarios();  // Recargar la lista de horarios
          },
          (error) => {
            console.error('Error al crear bloques de horario:', error);
          }
        );
      }
    }
  }

  // Ver los bloques asociados a un horario
  verBloques(horarioId: number): void {
    this.router.navigate(['/bloques-horario', horarioId]);  // Redirige al componente de bloques de horario
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `CREACION del bloque de Horario del medico: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
