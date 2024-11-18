// src/app/paciente/paciente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Paciente } from './model/user.model'; // Ajusta la ruta del modelo Paciente
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
        return throwError(error); 
      })
    );
  }

  // Eliminar un paciente
  deletePaciente(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al eliminar paciente:', error);
        return throwError(error);
      })
    );
  }

  // Obtener un paciente por ID
  getPacienteById(id: number): Observable<Paciente> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Paciente>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener datos del paciente:', error);
        return throwError(error);
      })
    );
  }
}