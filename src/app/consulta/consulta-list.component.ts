// src/app/consulta/consulta-list.component.ts
import { Component, OnInit } from '@angular/core';
import { ConsultaService } from '../consulta.service';  // Servicio para manejar consultas
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Consulta } from '../model/user.model';  // Modelo de consulta

@Component({
  selector: 'app-consulta-list',
  templateUrl: './consulta-list.component.html',
  styleUrls: ['./consulta-list.component.css']
})
export class ConsultaListComponent implements OnInit {
  public consultas: Consulta[] = [];  // Lista de consultas
  public userId: number = 0;

  constructor(
    public consultaService: ConsultaService,  // Servicio para gestionar consultas
    public router: Router,  // Router para navegación
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if(this.roleService.hasRole("ROLE_ADMIN")){
      this.loadConsultas();
    } else {
      if(this.roleService.hasRole("ROLE_MEDICO")){
        this.loadConsultasMed();
      } else {
        
      }
    }
  }

  // Obtener la lista de todas las consultas
  loadConsultas(): void {
    this.consultaService.getConsultas().subscribe(
      (data) => {
        this.consultas = data;  // Asignamos los datos de las consultas a la propiedad
        console.log("mostrar las consultas ....: ",this.consultas);
      },
      (error) => {
        console.error('Error al obtener las consultas:', error);
      }
    );
  }


  // Obtener la lista de todas las consultas de un medico
  loadConsultasMed(): void {
    this.consultaService.getConsultasByMedico(this.userId).subscribe(
      (data) => {
        this.consultas = data;  // Asignamos los datos de las consultas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las consultas:', error);
      }
    );
  }

  // Eliminar una consulta
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta consulta?')) {
      this.consultaService.deleteConsulta(id).subscribe(
        () => {
          this.loadConsultas();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar la consulta:', error);
        }
      );
    }
  }

  // Ver los detalles de una consulta
  verDetalles(consultaId: number): void {
    this.router.navigate(['/consulta-detail', consultaId]);  // Redirige al componente de detalles de la consulta
  }


}
