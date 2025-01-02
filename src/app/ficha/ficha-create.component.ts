import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FichaService } from '../ficha.service';
import { MedicoService } from '../medico.service';
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { EspecialidadService } from '../especialidad.service';
import { PacienteService } from '../paciente.service';
import { HorarioService } from '../horario.service';
import { Medico, Ficha, BloqueHorario, Horario, Paciente } from '../model/user.model';
import { Especialidad } from '../model/especialidad.model';
@Component({
  selector: 'app-ficha-create',
  templateUrl: './ficha-create.component.html',
  styleUrls: ['./ficha-create.component.css'],
})
export class FichaCreateComponent implements OnInit {
  public ficha: Ficha = {
    id: 0,
    paciente:  { id: 0, ci: '', sexo: '', telefono: '',
        user: {id: 0, username: '', email: '', password:'', roles: [],},
        fechaNacimiento: '',codigoAsegurado: ''
      },
    especialidad: { id: 0, nombre: '',descripcion: ''}, 
    bloqueHorario: { id: 0, horaInicio: new Date(), horaFin: new Date(), duracion: 0, estado: 'activo', horario: { id: 0, horaInicio: new Date(), horaFin: new Date(), duracion: 0, diaSemana: '', estado: 'activo', medico: { id: 0, ci: '', sexo: '', telefono: '', user: { id: 0, username: '', email: '', password: '', roles: [] } } } },
    fecha: '2024-12-06',
    hora: '12:06:03',
    estado: 'pendiente',
    medicoId: 0,
  };
  public userId: number = 0 ; 

  public medicos: Medico[] = [];
  public especialidades: Especialidad[] = [];
  public bloquesHorarios: BloqueHorario[] = [];
  public horarios2: Horario[] = [];
  public pacientes: Paciente[] = [];
  public errorMessage: string = '';
  public isSuccessful: boolean = false;
  public isCreateFailed: boolean = false;
  isBloqueHorarioLibre(): boolean {
    return this.ficha.bloqueHorario && this.ficha.bloqueHorario.estado === 'libre';
  }
  constructor(
    private fichaService: FichaService,
    private medicoService: MedicoService,
    private especialidadService: EspecialidadService,
    private pacienteService: PacienteService,
    private horarioService: HorarioService,
    public RoleService: RoleService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener lista de médicos
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    this.medicoService.getMedicos().subscribe(
      (data) => {
        this.medicos = data;
      },
      (error) => {
        console.error('Error al obtener médicos:', error);
      }
    );
    //con una condicion verifica si paciente o adminitrador
    if(this.RoleService.hasRole("ROLE_PACIENTE")){
      this.pacienteService.getPacientesByUserId(this.userId).subscribe(
        (data) => {
          this.pacientes = data;
        },
        (error) => {
          console.error('Error al obtener pacientes:', error);
        }
      );
    }else{
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

  // Cuando se selecciona un paciente, actualizar el modelo ficha
  onPacienteChange(pacienteId: number): void {
    // Buscar al paciente seleccionado y actualizar la ficha
    this.ficha.paciente = this.pacientes.find(p => p.id === pacienteId) || this.ficha.paciente;
    console.log("Paciente seleccionado: ", this.ficha.paciente);
  }

  // Cuando se selecciona un médico, obtener las especialidades y los días disponibles
  onMedicoChange(medicoId: number): void {
    this.ficha.medicoId = medicoId;

    // Obtener las especialidades del médico seleccionado
    this.medicoService.getEspecialidadesByMedicoId(medicoId).subscribe(
      (data) => {
        this.especialidades = data;
      },
      (error) => {
        console.error('Error al obtener especialidades:', error);
      });

    // Obtener los días|horario disponibles del médico
    this.horarioService.getHorariosByMedicoId(medicoId).subscribe(
      (data) => {
        this.horarios2 = data;
        console.log("días|horario: ",data);
      },
      (error) => {
        console.error('Error al obtener los días disponibles:', error);
      }
    );
  }

  // Cuando se selecciona un día, obtener los bloques horarios correspondientes
  onHorarioChange(horarioId: number): void {
    // Obtener los bloques horarios disponibles según el día seleccionado
    console.log("el id de horario para bloques: ",horarioId);
    this.horarioService.getBloquesByHorarioId(horarioId).subscribe(
      (data) => {
        this.bloquesHorarios = data;
        console.log("bloques: ",this.bloquesHorarios);
      },
      (error) => {
        console.error('Error al obtener bloques horarios:', error);
      }
    );
  }

  // Crear la ficha
  createFicha(): void {
    this.fichaService.createFicha(this.ficha).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['/ficha-list']);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
        
      }
    );
    
  }



  

}
