import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TratamientoService } from '../tratamiento.service';
import { ConsultaService } from '../consulta.service';
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Tratamiento, Consulta } from '../model/user.model';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-tratamiento-create',
  templateUrl: './tratamiento-create.component.html',
  styleUrls: ['./tratamiento-create.component.css']
})
export class TratamientoCreateComponent implements OnInit {
  public tratamiento: Tratamiento = {
    id: 0,
    consultaId: 0,
    descripcion: '',
    fechaInicio: '',
    fechaFin: '',
    seguimiento: ''
  };
  public userId: number = 0;
  public consultas: Consulta[] = [];
  public errorMessage: string = '';
  public isSuccessful: boolean = false;
  public isCreateFailed: boolean = false;

  constructor(
    private tratamientoService: TratamientoService,
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
        console.error('Error al obtener las consultas:', error);
      }
    );
  }

  loadConsultasMed(): void {
    this.consultaService.getConsultasByMedico(this.userId).subscribe(
      (data) => {
        this.consultas = data;
      },
      (error) => {
        console.error('Error al obtener las consultas:', error);
      }
    );
  }

  createTratamiento(): void {
    this.tratamientoService.createTratamiento(this.tratamiento).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        console.log("create Tratamiento: ",data);
        this.registrarAccion(this.tratamiento.consultaId);
        this.router.navigate(['/tratamiento-list']);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  registrarAccion(name: any): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `CREACION de tratamiento con la consulta de Id: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
