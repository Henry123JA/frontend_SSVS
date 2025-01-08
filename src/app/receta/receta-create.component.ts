import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { RecetaService } from '../receta.service';
import { FichaService } from '../ficha.service';
import { ConsultaService } from '../consulta.service';
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Ficha,Consulta, Receta } from '../model/user.model';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-receta-create',
  templateUrl: './receta-create.component.html',
  styleUrls: ['./receta-create.component.css']
})
export class RecetaCreateComponent implements OnInit {
  public receta: Receta = {
    id: 0,
    consultaId: 0,
    medicamentos: '',
    indicaciones: '',
    fechaConsulta: '',
  };
  public userId: number = 0;
  public consultas: Consulta[] = [];
  public errorMessage: string = '';
  public isSuccessful: boolean = false;
  public isCreateFailed: boolean = false;

  constructor(
    private recetaService: RecetaService,
    private fichaService: FichaService,
    private consultaService: ConsultaService, 
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
    public bitacoraService: BitacoraService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); 
    this.userId = usuario.id;

    if(this.roleService.hasRole("ROLE_ADMIN")){
        this.loadConsultas();
    } else {
      if(this.roleService.hasRole("ROLE_MEDICO")){
        this.loadConsultasMed();
      }
    }
  }

  loadConsultas(): void {
    this.consultaService.getConsultas().subscribe(
      (data) => {
        this.consultas = data;
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }

  loadConsultasMed(): void {
    this.consultaService.getConsultasByMedico(this.userId).subscribe(
      (data) => {
        this.consultas = data;
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }

  createReceta(): void {
    this.recetaService.createReceta(this.receta).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['/receta-list']);
        this.registrarAccion(this.receta.consultaId);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  registrarAccion(name: any): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `CREACION de receta con la consulta de Id: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
