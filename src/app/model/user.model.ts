// src/app/user.model.ts

import { Time } from '@angular/common';
import { Especialidad } from './especialidad.model';

export interface Role {
    id: number;
    name: string;
  }
  
  export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    roles: Role[];
  }
  export interface Medico {
    id: number;
    ci: string;        
    sexo: string;      
    telefono: string;  
    user: User;        
  }
  
  export interface Paciente {
    id: number;
    ci: string;        
    sexo: string;      
    telefono: string;  
    user: User;        
    fechaNacimiento: string;
    codigoAsegurado: string; 
  }
  
  export interface Horario {
    id: number;             
    horaInicio: Date;       
    horaFin: Date;          
    duracion: number;       // Duración en minutos
    diaSemana: string;      // Día de la semana (por ejemplo, 'Lunes', 'Martes')
    estado: string;         // Estado del horario (por ejemplo, 'activo', 'inactivo')
    medico: Medico;       
  }

  export interface BloqueHorario {
    id: number;                  
    horaInicio: Date;           
    horaFin: Date;              
    duracion: number;             
    estado: string;               
    horario: Horario;             
  }

  export interface Ficha {
    id: number;
    paciente: Paciente;  // Relación con la entidad Paciente
    medicoId: number;    // ID del médico
    especialidad: Especialidad;  // Relación con la entidad Especialidad
    bloqueHorario: BloqueHorario;  // Relación con la entidad BloqueHorario
    fecha: string;  // Fecha de la cita (formato 'YYYY-MM-DD')
    hora: string;   // Hora de la cita (formato 'HH:mm')
    estado: string; // Estado de la cita ('pendiente', 'completada', 'cancelada')
  }

  
  export interface Consulta {
    id: number;
    fichaId: number; // Relación con la entidad FichaNueva
    sintomas: string;
    diagnostico: string;
    tratamiento: string;
    notas: string;
    fechaConsulta: string;  // Fecha de la consulta (formato ISO 8601 'YYYY-MM-DDTHH:mm:ss.sssZ')
  }
  
  export interface Receta{
    id: number;
    medicamentos: string;
    indicaciones: string;
    fechaConsulta: string;
    consultaId: number;
  }

  export interface Tratamiento {
    id: number;
    consultaId: number;  // ID de la consulta asociada
    descripcion: string;  // Descripción del tratamiento
    fechaInicio: string;  // Fecha de inicio del tratamiento (formato ISO 8601 'YYYY-MM-DD')
    fechaFin: string;  // Fecha de fin del tratamiento (formato ISO 8601 'YYYY-MM-DD')
    seguimiento: string | null;  // Seguimiento del tratamiento (puede ser null)
  }

  export interface Examen {
    id: number;
    consultaId: number;  
    laboratorioNombre: string; 
    tipoExamen: string;  // Fecha de inicio del tratamiento (formato ISO 8601 'YYYY-MM-DD')
    resultados: string;  // Fecha de fin del tratamiento (formato ISO 8601 'YYYY-MM-DD')
    fechaExamen: string;  // Seguimiento del tratamiento (puede ser null)
  }
  
  export interface Bitacora {
    id: number;  // ID del registro
    tipoAccion: string;  // Tipo de acción: 'CREAR', 'EDITAR', 'VER'
    descripcionAccion: string;  // Descripción de lo que se hizo
    ip: string;  // Dirección IP de la máquina que realiza la acción
    fechaHora: string;  // Fecha y hora cuando ocurrió la acción
    userId: number;
    
  }


  export interface Antecedente {
    id: number;
    paciente: Paciente;                          // Relación con Paciente
    enfermedadesBase: string;                    // Antecedentes personales (enfermedades base)
    enfermedadesHereditarias: string;            // Antecedentes familiares (enfermedades hereditarias)
    otras: string;                               // Antecedentes personales no patológicos
    fecha: string;                               // Fecha de creación de los antecedentes
  }
  