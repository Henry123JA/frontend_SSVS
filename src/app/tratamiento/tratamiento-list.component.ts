import { Component, OnInit } from '@angular/core';
import { TratamientoService } from '../tratamiento.service';  // Servicio para manejar tratamientos
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Tratamiento } from '../model/user.model';  // Modelo de tratamiento

@Component({
  selector: 'app-tratamiento-list',
  templateUrl: './tratamiento-list.component.html',
  styleUrls: ['./tratamiento-list.component.css']
})
export class TratamientoListComponent implements OnInit {
  public tratamientos: Tratamiento[] = [];  // Lista de tratamientos
  public userId: number = 0;

  constructor(
    public tratamientoService: TratamientoService,  // Servicio para gestionar tratamientos
    public router: Router,  // Router para navegación
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if (this.roleService.hasRole("ROLE_ADMIN")) {
      this.loadTratamientos();
    } else {
      if (this.roleService.hasRole("ROLE_MEDICO")) {
        this.loadTratamientosMed();
      }
    }
  }

  // Obtener la lista de todos los tratamientos
  loadTratamientos(): void {
    this.tratamientoService.getTratamientos().subscribe(
      (data) => {
        this.tratamientos = data;  // Asignamos los datos de los tratamientos a la propiedad
      },
      (error) => {
        console.error('Error al obtener los tratamientos:', error);
      }
    );
  }

  // Obtener la lista de todos los tratamientos de un médico
  loadTratamientosMed(): void {
    this.tratamientoService.getTratamientosByMedico(this.userId).subscribe(
      (data) => {
        this.tratamientos = data;  // Asignamos los datos de los tratamientos a la propiedad
      },
      (error) => {
        console.error('Error al obtener los tratamientos del médico:', error);
      }
    );
  }

  // Eliminar un tratamiento
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este tratamiento?')) {
      this.tratamientoService.deleteTratamiento(id).subscribe(
        () => {
          this.loadTratamientos();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el tratamiento:', error);
        }
      );
    }
  }

  // Ver los detalles de un tratamiento
  verDetalles(tratamientoId: number): void {
    this.router.navigate(['/tratamiento-detail', tratamientoId]);  // Redirige al componente de detalles del tratamiento
  }
}
