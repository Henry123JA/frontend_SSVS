// src/app/services/bitacora.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bitacora,User } from './model/user.model';  
import { TokenStorageService } from './_services/token-storage.service';
import { catchError,map,switchMap  } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BitacoraService {
  private apiUrl = 'http://localhost:8080/api/bitacoras'; // Endpoint para la bitácora

  constructor(
    private http: HttpClient, 
    private tokenStorage: TokenStorageService  // Servicio de token para autorización
  ) {}

  // Método para obtener todos los registros de la bitácora
  obtenerRegistros(userId: number): Observable<Bitacora[]> {
    const token = this.tokenStorage.getToken();  // Obtener el token del almacenamiento
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);  // Añadir el token a los headers
    const url = `${this.apiUrl}/usuario/${userId}`;  // Cambiar a la URL del backend que filtra por usuario

    return this.http.get<Bitacora[]>(url, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log('Token no válido o no autorizado');
        }
        return throwError(error);  // Manejo de errores
      })
    );
  }

  
    registrarAccion(tipoAccion: string, descripcionAccion: string): Observable<Bitacora> {
      const token = this.tokenStorage.getToken();
      const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
      
      const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
      const userId = usuario.id;
      // Aquí obtendrás la IP del cliente utilizando un servicio externo como ipify (simulado)
      
      return this.getIp().pipe(
        switchMap(ip => {
          const registro: Bitacora = {
            id: 0,  // El ID se genera automáticamente por el backend
            tipoAccion,
            descripcionAccion,
            ip,
            fechaHora: new Date().toISOString(),
            userId,
          };
          console.log("Registrar acción: ", registro);
  
          return this.http.post<Bitacora>(`${this.apiUrl}/registro`, registro, { headers }).pipe(
            catchError(error => {
              if (error.status === 401) {
                console.log('Token no válido o no autorizado');
              }
              return throwError(error);  // Manejo de errores
            })
          );
        })
        
      );
      console.log("switchMap: llego al final");
    }

  getIp(): Observable<string> {
    return this.http.get<any>('https://ipinfo.io/json').pipe(
      map(response => response.ip)
    );

  }

}
