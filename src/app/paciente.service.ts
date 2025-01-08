// src/app/paciente/paciente.service.ts

import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from './model/user.model';  // Importa el modelo de Paciente
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PacienteService {
  private apiUrl = 'http://localhost:8080/api/pacientes'; // Endpoint para pacientes

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todos los pacientes
  getPacientes(): Observable<Paciente[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Paciente[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Crear un nuevo paciente
  createPaciente(paciente: Paciente): Observable<Paciente> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Paciente>(this.apiUrl, paciente, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        console.log("Error en la creación del paciente...");
        return throwError(error); 
      })
    );
  }

  // Eliminar un paciente
  deletePaciente(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Obtener un paciente por su ID
  getPacienteById(id: number): Observable<Paciente> {
    const token = this.tokenStorage.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers });
  }

  // Método para obtener pacientes por userId
  getPacientesByUserId(userId: number): Observable<Paciente[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Paciente[]>(`${this.apiUrl}/byUser/${userId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

   // Obtener los pacientes asociadas a un médico (por userId)
   getPacientesByMedico(userId: number): Observable<any[]> {  // Cambié el tipo de retorno a cualquier tipo de objeto (en el backend se mapea a un objeto)
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<any[]>(`${this.apiUrl}/medico/${userId}`, { headers }).pipe(  // Aquí se conecta con el método que hicimos en el backend
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }
}
