import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tratamiento } from './model/user.model';  // Asegúrate de tener el modelo de Tratamiento
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class TratamientoService {
  private apiUrl = 'http://localhost:8080/api/tratamientos';  // Endpoint para los tratamientos

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todos los tratamientos
  getTratamientos(): Observable<Tratamiento[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Tratamiento[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener tratamiento por ID
  getTratamientoById(id: number): Observable<Tratamiento> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Tratamiento>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Obtener tratamiento asociado a una consulta
  getTratamientoByConsulta(consultaId: number): Observable<Tratamiento> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<Tratamiento>(`${this.apiUrl}/consulta/${consultaId}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Crear un nuevo tratamiento
  createTratamiento(tratamiento: Tratamiento): Observable<Tratamiento> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    console.log("Creando tratamiento: ", tratamiento);
    return this.http.post<Tratamiento>(this.apiUrl, tratamiento, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  // Eliminar un tratamiento
  deleteTratamiento(id: number): Observable<void> {
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

  // Obtener los tratamientos asociados a un médico (por userId)
  getTratamientosByMedico(userId: number): Observable<any[]> {  // Cambié el tipo de retorno a cualquier tipo de objeto (en el backend se mapea a un objeto)
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
