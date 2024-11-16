// src/app/especialidad/especialidad.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Especialidad } from './model/especialidad.model';  // Asegúrate de tener el modelo de Especialidad
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class EspecialidadService {
  private apiUrl = 'http://localhost:8080/api/especialidades'; // Endpoint para especialidades médicas

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todas las especialidades
  getEspecialidades(): Observable<Especialidad[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Especialidad[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Crear una nueva especialidad
  createEspecialidad(especialidad: Especialidad): Observable<Especialidad> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.post<Especialidad>(this.apiUrl, especialidad, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Eliminar una especialidad
  deleteEspecialidad(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Obtener especialidad por ID
  getEspecialidadById(id: number): Observable<Especialidad> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Especialidad>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }
}
