// src/app/consulta/consulta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Consulta } from './model/user.model';  // Asegúrate de tener el modelo de Consulta
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ConsultaService {
  private apiUrl = 'http://localhost:8080/api/consultas';  // Endpoint para las consultas

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todas las consultas
  getConsultas(): Observable<Consulta[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Consulta[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Crear una nueva consulta
  createConsulta(consulta: Consulta): Observable<Consulta> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("Creando consulta: ", consulta);
    return this.http.post<Consulta>(this.apiUrl, consulta, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Eliminar una consulta
  deleteConsulta(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener consultas por paciente
  getConsultasByPaciente(pacienteId: number): Observable<Consulta[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Llamada al endpoint usando apiUrl para obtener las consultas del paciente
    return this.http.get<Consulta[]>(`${this.apiUrl}/paciente/${pacienteId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener consultas por médico
  getConsultasByMedico(userId: number): Observable<Consulta[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Llamada al endpoint usando apiUrl para obtener las consultas del médico
    return this.http.get<Consulta[]>(`${this.apiUrl}/medico/${userId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);
      })
    );
  }

  // Obtener consulta por ID
  getConsultaById(id: number): Observable<Consulta> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Consulta>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }
}
