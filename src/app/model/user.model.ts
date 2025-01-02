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

  export interface Bitacora {
    id: number;  // ID del registro
    tipoAccion: string;  // Tipo de acción: 'CREAR', 'EDITAR', 'VER'
    descripcionAccion: string;  // Descripción de lo que se hizo
    ip: string;  // Dirección IP de la máquina que realiza la acción
    fechaHora: string;  // Fecha y hora cuando ocurrió la acción
    userId: number;
    
  }
  