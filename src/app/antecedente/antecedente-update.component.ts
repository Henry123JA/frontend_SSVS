import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { AntecedenteService } from '../antecedente.service';
import { PacienteService } from '../paciente.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { RoleService } from '../role.service';
import { Paciente } from '../model/user.model';
import { Antecedente } from '../model/user.model';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-antecedente-update',
  templateUrl: './antecedente-update.component.html',
  styleUrls: ['./antecedente-update.component.css'],
})
export class AntecedenteUpdateComponent implements OnInit {
  public antecedente: Antecedente = {
    id: 0,
    paciente: { id: 0, ci: '', sexo: '', telefono: '', user: { id: 0, username: '', email: '', password: '', roles: [] }, fechaNacimiento: '', codigoAsegurado: '' },
    enfermedadesBase: '',
    enfermedadesHereditarias: '',
    otras: '',
    fecha: '', // Fecha actual por defecto
  };

  public pacientes: Paciente[] = [];
  public userId: number = 0;
  public isSuccessful: boolean = false;
  public isUpdateFailed: boolean = false;
  public errorMessage: string = '';

  constructor(
    private antecedenteService: AntecedenteService,
    private pacienteService: PacienteService,
    private tokenStorage: TokenStorageService,
    public roleService: RoleService,
    public bitacoraService: BitacoraService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el id del antecedente desde la URL
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.loadAntecedente(id);
    }

    // Obtener el usuario logueado
    const usuario = this.tokenStorage.getUser();
    this.userId = usuario.id;

    // Obtener los pacientes
    if (this.roleService.hasRole('ROLE_PACIENTE')) {
      this.pacienteService.getPacientesByUserId(this.userId).subscribe(
        (data) => {
          this.pacientes = data;
        },
        (error) => {
          console.error('Error al obtener pacientes:', error);
        }
      );
    } else {
      this.pacienteService.getPacientes().subscribe(
        (data) => {
          this.pacientes = data;
        },
        (error) => {
          console.error('Error al obtener pacientes:', error);
        }
      );
    }
  }

  // Cargar antecedente por id
  loadAntecedente(id: any): void {
    this.antecedenteService.getAntecedenteById(id).subscribe(
      (data) => {
        this.antecedente = data;
      },
      (error) => {
        console.error('Error al cargar antecedente:', error);
      }
    );
  }

  // Actualizar antecedente
  updateAntecedente(): void {
    this.antecedenteService.updateAntecedente(this.antecedente).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isUpdateFailed = false;
        this.registrarAccion(this.antecedente.paciente.user.username);
        this.router.navigate(['/antecedente-list']);
      },
      (err) => {
        this.isUpdateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('EDITAR', `EDITADO de Antecedente del paciente: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}
