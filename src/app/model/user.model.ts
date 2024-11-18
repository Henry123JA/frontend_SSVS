// src/app/user/user.model.ts
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
  export interface Bitacora {
    id: number;  // ID del registro
    tipoAccion: string;  // Tipo de acción: 'CREAR', 'EDITAR', 'VER'
    descripcionAccion: string;  // Descripción de lo que se hizo
    ip: string;  // Dirección IP de la máquina que realiza la acción
    fechaHora: string;  // Fecha y hora cuando ocurrió la acción
    userId: number;
    
  }
  