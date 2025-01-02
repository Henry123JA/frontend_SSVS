import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Horario,BloqueHorario } from './model/user.model';  // Aquí importas el modelo Horario
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class HorarioService {
  private apiUrl = 'http://localhost:8080/api/horarios'; // Endpoint para horarios
  private apiUrlCrearBloques = 'http://localhost:8080/api/horarios/crear-bloques';
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todos los horarios
  getHorarios(): Observable<Horario[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Horario[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        console.log('error al pedir la lista: ',error);
        return throwError(error); // Manejo de errores
      })
      
    );
  }

  // Crear un nuevo horario
  createHorario(horario: Horario): Observable<Horario> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log('llego a create horario',horario);
    return this.http.post<Horario>(this.apiUrl, horario, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Eliminar un horario
  deleteHorario(id: number): Observable<void> {
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

  // Obtener un horario por ID
  getHorarioById(id: number): Observable<Horario> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Horario>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Actualizar un horario
  updateHorario(id: number, horario: Horario): Observable<Horario> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.put<Horario>(`${this.apiUrl}/${id}`, horario, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Crear los bloques de un horario (nuevo método)
  createHorariosConBloques(horario: Horario): Observable<Horario> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Horario>(this.apiUrlCrearBloques, horario, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        console.log('Error al crear bloques de horario: ', error);
        return throwError(error); // Manejo de errores
      })
    );
  }

  getBloquesByHorarioId(horarioId: number): Observable<BloqueHorario[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get<BloqueHorario[]>(`${this.apiUrlCrearBloques}/${horarioId}`, { headers }).pipe(
      catchError(error => {
        console.log('Error al obtener bloques de horario: ', error);
        return throwError(error); // Manejo de errores
      })
    );
  }

  deleteBloqueHorario(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrlCrearBloques}/${id}`, { headers }).pipe(
      catchError(error => {
        console.log('Error al eliminar bloque de horario: ', error);
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Método en el servicio para obtener los horarios de un médico por su ID
  getHorariosByMedicoId(medicoId: number): Observable<Horario[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Horario[]>(`${this.apiUrl}/horarios-medico/${medicoId}`, { headers }).pipe(
      catchError(error => {
        console.log('Error al obtener horarios del médico: ', error);
        return throwError(error); // Manejo de errores
      })
    );
  }


}
