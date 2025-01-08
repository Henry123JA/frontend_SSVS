// src/app/receta/receta.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Receta } from './model/user.model';  // Asegúrate de tener el modelo de Receta
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class RecetaService {
  private apiUrl = 'http://localhost:8080/api/recetas';  // Endpoint para las recetas

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todas las recetas
  getRecetas(): Observable<Receta[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Receta[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener receta por ID
  getRecetaById(id: number): Observable<Receta> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Receta>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener receta asociada a una consulta
  getRecetaByConsulta(consultaId: number): Observable<Receta> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Receta>(`${this.apiUrl}/consulta/${consultaId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Crear una nueva receta
  createReceta(receta: Receta): Observable<Receta> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("Creando receta: ", receta);
    return this.http.post<Receta>(this.apiUrl, receta, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Eliminar una receta
  deleteReceta(id: number): Observable<void> {
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

  // Obtener las recetas asociadas a un médico (por userId)
  getRecetasByMedico(userId: number): Observable<any[]> {  // Cambié el tipo de retorno a cualquier tipo de objeto (en el backend se mapea a un objeto)
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
