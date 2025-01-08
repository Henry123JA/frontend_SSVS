// src/app/receta/receta-list.component.ts
import { Component, OnInit } from '@angular/core';
import { RecetaService } from '../receta.service';  // Servicio para manejar recetas
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Receta } from '../model/user.model';  // Modelo de receta

@Component({
  selector: 'app-receta-list',
  templateUrl: './receta-list.component.html',
  styleUrls: ['./receta-list.component.css']
})
export class RecetaListComponent implements OnInit {
  public recetas: Receta[] = [];  // Lista de recetas
  public userId: number = 0;

  constructor(
    public recetaService: RecetaService,  // Servicio para gestionar recetas
    public router: Router,  // Router para navegación
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if (this.roleService.hasRole("ROLE_ADMIN")) {
      this.loadRecetas();
    } else {
      if (this.roleService.hasRole("ROLE_MEDICO")) {
        this.loadRecetasMed();
      }
    }
  }

  // Obtener la lista de todas las recetas
  loadRecetas(): void {
    this.recetaService.getRecetas().subscribe(
      (data) => {
        this.recetas = data;  // Asignamos los datos de las recetas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las recetas:', error);
      }
    );
  }

  // Obtener la lista de todas las recetas de un médico
  loadRecetasMed(): void {
    this.recetaService.getRecetasByMedico(this.userId).subscribe(
      (data) => {
        this.recetas = data;  // Asignamos los datos de las recetas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las recetas del médico:', error);
      }
    );
  }
/*
  // Obtener las recetas asociadas a un paciente
  loadRecetasPaciente(): void {
    this.recetaService.getRecetasByPaciente(this.userId).subscribe(
      (data) => {
        this.recetas = data;  // Asignamos los datos de las recetas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las recetas del paciente:', error);
      }
    );
  }*/

  // Eliminar una receta
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta receta?')) {
      this.recetaService.deleteReceta(id).subscribe(
        () => {
          this.loadRecetas();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar la receta:', error);
        }
      );
    }
  }

  // Ver los detalles de una receta
  verDetalles(recetaId: number): void {
    this.router.navigate(['/receta-detail', recetaId]);  // Redirige al componente de detalles de la receta
  }
}
