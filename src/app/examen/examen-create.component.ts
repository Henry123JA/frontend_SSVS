import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ExamenService } from '../examen.service';
import { ConsultaService } from '../consulta.service';
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Examen, Consulta } from '../model/user.model';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-examen-create',
  templateUrl: './examen-create.component.html',
  styleUrls: ['./examen-create.component.css']
})
export class ExamenCreateComponent implements OnInit {
  public examen: Examen = {
    id: 0,
    consultaId: 0,
    laboratorioNombre: '',
    tipoExamen: '',
    resultados: '',
    fechaExamen: ''
  };
  public userId: number = 0;
  public consultas: Consulta[] = [];
  public errorMessage: string = '';
  public isSuccessful: boolean = false;
  public isCreateFailed: boolean = false;

  constructor(
    private examenService: ExamenService,
    private consultaService: ConsultaService,
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
    public bitacoraService: BitacoraService,

    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser();
    this.userId = usuario.id;

    if (this.roleService.hasRole("ROLE_ADMIN")) {
      this.loadConsultas();
    } else {
      if (this.roleService.hasRole("ROLE_MEDICO")) {
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

  createExamen(): void {
    this.examenService.createExamen(this.examen).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.registrarAccion(this.examen.consultaId);
        this.router.navigate(['/examen-list']);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  registrarAccion(name: any): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `CREACION de examen con la consulta de Id: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
