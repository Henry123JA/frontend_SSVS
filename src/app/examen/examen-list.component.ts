// src/app/examen/examen-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ExamenService } from '../examen.service';  // Servicio para manejar exámenes
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Examen } from '../model/user.model';  // Modelo de examen

@Component({
  selector: 'app-examen-list',
  templateUrl: './examen-list.component.html',
  styleUrls: ['./examen-list.component.css']
})
export class ExamenListComponent implements OnInit {
  public examenes: Examen[] = [];  // Lista de exámenes
  public userId: number = 0;

  constructor(
    public examenService: ExamenService,  // Servicio para gestionar exámenes
    public router: Router,  // Router para navegación
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if (this.roleService.hasRole("ROLE_ADMIN")) {
      this.loadExamenes();
    } else {
      if (this.roleService.hasRole("ROLE_MEDICO")) {
        this.loadExamenesMed();
      }
    }
  }

  // Obtener la lista de todos los exámenes
  loadExamenes(): void {
    this.examenService.getExamenes().subscribe(
      (data) => {
        this.examenes = data;  // Asignamos los datos de los exámenes a la propiedad
      },
      (error) => {
        console.error('Error al obtener los exámenes:', error);
      }
    );
  }

  // Obtener la lista de todos los exámenes de un médico
  loadExamenesMed(): void {
    this.examenService.getExamenesByMedico(this.userId).subscribe(
      (data) => {
        this.examenes = data;  // Asignamos los datos de los exámenes a la propiedad
      },
      (error) => {
        console.error('Error al obtener los exámenes del médico:', error);
      }
    );
  }

  // Eliminar un examen
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este examen?')) {
      this.examenService.deleteExamen(id).subscribe(
        () => {
          this.loadExamenes();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el examen:', error);
        }
      );
    }
  }

  // Ver los detalles de un examen
  verDetalles(examenId: number): void {
    this.router.navigate(['/examen-detail', examenId]);  // Redirige al componente de detalles del examen
  }
}
