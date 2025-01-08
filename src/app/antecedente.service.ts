// src/app/antecedente/antecedente.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Antecedente } from './model/user.model';  // Asegúrate de tener el modelo de Antecedente
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AntecedenteService {
  private apiUrl = 'http://localhost:8080/api/antecedentes';  // Endpoint para los antecedentes

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todos los antecedentes
  getAntecedentes(): Observable<Antecedente[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Antecedente[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener los antecedentes de un paciente por su ID
  getAntecedentesByPaciente(userId: number): Observable<Antecedente> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Llamada al endpoint usando apiUrl para obtener los antecedentes del paciente
    return this.http.get<Antecedente>(`${this.apiUrl}/user/${userId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Crear un nuevo antecedente
  createAntecedente(antecedente: Antecedente): Observable<Antecedente> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("llego antecedente a create: ", antecedente);
    return this.http.post<Antecedente>(this.apiUrl, antecedente, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Eliminar un antecedente
  deleteAntecedente(id: number): Observable<void> {
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

  // Obtener un antecedente por su ID
  getAntecedenteById(id: number): Observable<Antecedente> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Antecedente>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Actualizar un antecedente
  updateAntecedente(antecedente: Antecedente): Observable<Antecedente> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.put<Antecedente>(`${this.apiUrl}/${antecedente.id}`, antecedente, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }
}
