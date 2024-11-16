// src/app/medico/medico.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Medico } from './model/user.model';  // Aquí importas el modelo Medico
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class MedicoService {
  private apiUrl = 'http://localhost:8080/api/medicos'; // Endpoint para médicos

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  // Obtener todos los médicos
  getMedicos(): Observable<Medico[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.get<Medico[]>(this.apiUrl, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Crear un nuevo médico
  createMedico(medico: Medico): Observable<Medico> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.post<Medico>(this.apiUrl, medico, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        console.log("llego a medico.service...");
        return throwError(error); 
      })
    );
  }

  // Eliminar un médico
  deleteMedico(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  getMedicoById(id: number): Observable<Medico> {
    const token = this.tokenStorage.getToken();  
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    return this.http.get<Medico>(`${this.apiUrl}/${id}`, { headers });
  }

  updateMedico(id: number, medico: Medico): Observable<Medico> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Headers de updateMedico:", headers);
    
    return this.http.put<Medico>(`${this.apiUrl}/${id}`, medico, { headers });
  }
  

//--------------------------------ESTOS TRES SON DE ESPECIALIDAD MEDICO PERO AUN NO ESTAN LISTO ....-----
  // Asignar especialidad a un médico
  assignEspecialidadToMedico(medicoId: number, especialidadId: number): Observable<any> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${medicoId}/especialidades/${especialidadId}`;
    
    return this.http.post<any>(url, {}, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Eliminar especialidad de un médico
  removeEspecialidadFromMedico(medicoId: number, especialidadId: number): Observable<any> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/${medicoId}/especialidades/${especialidadId}`;
    
    return this.http.delete<any>(url, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error); // Manejo de errores
      })
    );
  }

  // Obtener todos los médicos con sus especialidades
  getMedicosConEspecialidades(): Observable<any[]> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const url = `${this.apiUrl}/medicos-con-especialidades`;  // Asegúrate de tener este endpoint en el backend
    
    return this.http.get<any[]>(url, { headers }).pipe(
      catchError(error => {
        console.error('Error al obtener médicos con especialidades:', error);
        return throwError(error);  // Manejo de errores
      })
    );
  }
  //----------------------------------------------------------------------------------------------------
  

}
