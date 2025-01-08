// src/app/examen/examen.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Examen } from './model/user.model';  // Asegúrate de tener el modelo de Examen
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ExamenService {
  private apiUrl = 'http://localhost:8080/api/examenes';  // Endpoint para los exámenes

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todos los exámenes
  getExamenes(): Observable<Examen[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Examen[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener examen por ID
  getExamenById(id: number): Observable<Examen> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Examen>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener examen asociado a una consulta
  getExamenByConsulta(consultaId: number): Observable<Examen> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Examen>(`${this.apiUrl}/consulta/${consultaId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener lista de exámenes asociados a una consulta
  getExamenesBy2Consulta(consultaId: number): Observable<Examen[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Examen[]>(`${this.apiUrl}/consulta2/${consultaId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        } else if (error.status === 404) {
          console.log('No se encontraron exámenes para esta consulta');
        } else {
          console.log('Error inesperado al obtener los exámenes:', error.message);
        }
        return throwError(() => error); // Manejo adecuado de errores
      })
    );
  }

  // Crear un nuevo examen
  createExamen(examen: Examen): Observable<Examen> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("Creando examen: ", examen);
    return this.http.post<Examen>(this.apiUrl, examen, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Eliminar un examen
  deleteExamen(id: number): Observable<void> {
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

  // Obtener los exámenes asociados a un médico (por userId)
  getExamenesByMedico(userId: number): Observable<any[]> {  // Cambié el tipo de retorno a cualquier tipo de objeto (en el backend se mapea a un objeto)
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
