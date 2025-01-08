import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConsultaService } from '../consulta.service';
import { FichaService } from '../ficha.service';
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Ficha,Antecedente, Consulta } from '../model/user.model';
import { AntecedenteService } from '../antecedente.service';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-consulta-create',
  templateUrl: './consulta-create.component.html',
  styleUrls: ['./consulta-create.component.css']
})
export class ConsultaCreateComponent implements OnInit {
  // Definimos ficha como 'any' para permitir más flexibilidad en los datos
  public consulta: Consulta = {
    id: 0,
    fichaId: 0,
    sintomas: '',
    diagnostico: '',
    tratamiento: '',
    notas: '',
    fechaConsulta: '',
  };
  public userId: number = 0;

  // Aquí almacenamos todas las fichas disponibles
  public fichas: Ficha[] = [];
  public antecedentes: Antecedente | null = null;/*
  public antecedentes: Antecedente = {
    id: 0,
    paciente: { id: 0, ci: '', sexo: '', telefono: '', user: { id: 0, username: '', email: '', password: '', roles: [] }, fechaNacimiento: '', codigoAsegurado: '' },
    enfermedadesBase: '',
    enfermedadesHereditarias: '',
    otras: '',
    fecha: '',
  };*/
  public errorMessage: string = '';
  public isSuccessful: boolean = false;
  public isCreateFailed: boolean = false;

  constructor(
    private consultaService: ConsultaService,
    private antecedenteService: AntecedenteService,
    public bitacoraService: BitacoraService,
    private fichaService: FichaService,
    public roleService: RoleService,
    private tokenStorage: TokenStorageService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id;

    if(this.roleService.hasRole("ROLE_ADMIN")){
        this.loadFichas();

    } else {
      if(this.roleService.hasRole("ROLE_MEDICO")){
        this.loadFichasMed();
      }
    }
    
  }

  loadFichas(): void {
    this.fichaService.getFichas().subscribe(
      (data) => {
        
        this.fichas = data;
        console.log("mostrar loadFichas de consulta....: ",this.fichas);
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }
  
    //this.antecedenteService.getAntecedentesByPaciente(ficha.paciente.user.id)

  loadFichasMed(): void {
    this.fichaService.getFichasByMedico(this.userId).subscribe(
      (data) => {
        this.fichas = data;
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }


  onAntecedentesChange(): void {
    //console.log("Ficha seleccionada...:", this.consulta.fichaId);
  
    if (this.consulta.fichaId) {
      //console.log("Fichas disponibles:", this.fichas); // Verifica las fichas disponibles en la lista
      //console.log("ID de ficha seleccionada:", this.consulta.fichaId); // Verifica el ID que se está buscando
  
      // Llamamos al servicio para obtener la ficha completa por su ID
      this.fichaService.getFichaById(this.consulta.fichaId).subscribe(
        (fichaSeleccionada) => {
          //console.log("Ficha seleccionada:", fichaSeleccionada);
          
          // Verificamos que fichaSeleccionada y sus propiedades estén definidas
          if (fichaSeleccionada && fichaSeleccionada.paciente && fichaSeleccionada.paciente.user) {
            console.log("Paciente ID:", fichaSeleccionada.paciente.user.id);
            
            // Llamamos al servicio para obtener los antecedentes del paciente
            this.antecedenteService.getAntecedentesByPaciente(fichaSeleccionada.paciente.user.id).subscribe(
              (data) => {
                if (data && (data.enfermedadesBase || data.enfermedadesHereditarias || data.otras)) {
                    this.antecedentes = data;  // Guardamos los antecedentes obtenidos
                    console.log("Antecedentes cargados:", this.antecedentes);
                  } else {
                    this.antecedentes = null;  // No hay antecedentes
                    console.log("El paciente no tiene antecedentes.");
                  }
              },
              (error) => {
                if (error.status === 404) {
                  console.log('Paciente no encontrado o sin antecedentes.');
                } else {
                  console.error('Error al obtener los antecedentes:', error);
                }
              }
            );
          }
        },
        (error) => {
          console.error('Error al obtener los detalles de la ficha:', error);
        }
      );
    }
  }
  
  

  createConsulta(): void {
    console.log("llego a createConsulta",this.consulta);
    console.log("createConsulta",this.consulta);
    this.consultaService.createConsulta(this.consulta).subscribe(
      (data) => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.registrarAccion(this.consulta.fichaId);
        this.router.navigate(['/consulta-list']);
      },
      (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;
      }
    );
  }

  registrarAccion(name: any): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('CREAR', `CREACION de consulta con la ficha de Id: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
}

