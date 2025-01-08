// src/app/ficha/ficha.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Ficha } from './model/user.model';  // Asegúrate de tener el modelo de Ficha
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FichaService {
  private apiUrl = 'http://localhost:8080/api/fichas';  // Endpoint para las fichas

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todas las fichas
  getFichas(): Observable<Ficha[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Ficha[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Crear una nueva ficha
  createFicha(ficha: Ficha): Observable<Ficha> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("llego ficha a create: ",ficha);
    return this.http.post<Ficha>(this.apiUrl, ficha, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Eliminar una ficha
  deleteFicha(id: number): Observable<void> {
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

  //obtener las fichas de un paciente
  getFichasByPaciente(userId: number): Observable<Ficha[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Llamada al endpoint usando apiUrl para obtener las fichas del paciente
    return this.http.get<Ficha[]>(`${this.apiUrl}/paciente/${userId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  //obtener las fichas de un medico
  getFichasByMedico(userId: number): Observable<Ficha[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
    // Llamada al endpoint usando apiUrl para obtener las fichas del paciente
    return this.http.get<Ficha[]>(`${this.apiUrl}/medico/${userId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);
      })
    );
  }

  // Obtener fichas por especialidad
  getFichasByEspecialidad(especialidadId: number): Observable<Ficha[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Llamada al endpoint para obtener fichas filtradas por especialidad
    return this.http.get<Ficha[]>(`${this.apiUrl}/especialidad/${especialidadId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }
  
  // Obtener ficha por ID de la ficha
  getFichaById(id: number): Observable<Ficha> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Ficha>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }
}
