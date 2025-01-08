// src/app/antecedente/antecedente-list.component.ts
import { Component, OnInit } from '@angular/core';
import { AntecedenteService } from '../antecedente.service';  // Servicio para manejar antecedentes
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Antecedente } from '../model/user.model';  // Modelo de antecedente

@Component({
  selector: 'app-antecedente-list',
  templateUrl: './antecedente-list.component.html',
  styleUrls: ['./antecedente-list.component.css']
})
export class AntecedenteListComponent implements OnInit {
  public antecedentes: Antecedente[] = [];  // Lista de antecedentes
  public userId: number = 0;

  constructor(
    public antecedenteService: AntecedenteService,  // Servicio para gestionar antecedentes
    public router: Router,  // Router para navegación
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    this.loadAntecedentes();
    
    
  }

  // Obtener la lista de todos los antecedentes
  loadAntecedentes(): void {
    this.antecedenteService.getAntecedentes().subscribe(
      (data) => {
        this.antecedentes = data;  // Asignamos los datos de los antecedentes a la propiedad
        console.log("antecedentes: ",this.antecedentes);
      },
      (error) => {
        console.error('Error al obtener los antecedentes:', error);
      }
    );
  }

  // Eliminar un antecedente
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar este antecedente?')) {
      this.antecedenteService.deleteAntecedente(id).subscribe(
        () => {
          this.loadAntecedentes();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar el antecedente:', error);
        }
      );
    }
  }

  // Ver los detalles de un antecedente
  verDetalles(antecedenteId: number): void {
    this.router.navigate(['/antecedente-detail', antecedenteId]);  // Redirige al componente de detalles del antecedente
  }
}
