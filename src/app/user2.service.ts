// src/app/user/user.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User,Medico } from './model/user.model'; // Suponiendo que tengas un modelo User
import { TokenStorageService } from './_services/token-storage.service';
import { catchError } from 'rxjs/operators';  // Asegúrate de importar catchError
import { throwError } from 'rxjs';
//import { UserListComponent } from './user/user-list.component';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private apiUrl = 'http://localhost:8080/api/users';

  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) {}

  //Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJhZG1pbiIsImlhdCI6MTczMDg0NjEwOSwiZXhwIjoxNzMwOTMyNTA5fQ.hsqBmFnr9Uwv4wvlEApGE6EInAJ2Y0YpMxAanBzcRfo
  getUsers(): Observable<User[]> {
    const token = this.tokenStorage.getToken(); // Obtener el token
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`); // Configurar encabezados
    
    //console.log("Headers:", headers);

  //return this.http.get(API_URL + 'medico', { headers, responseType: 'text' })
    //return this.http.get<User[]>(this.apiUrl, { headers }); // Enviar encabezados con la solicitud
    return this.http.get<User[]>(this.apiUrl, { headers}).pipe(
      catchError(error => {
        //console.error('Error al obtener los usuarios', error);
        if (error.status === 401) {
          console.log("Token no válido o no autorizado");
        }
        throw error; // Maneja el error si es necesario
      })
    );
  }

  getUserById(id: number): Observable<User> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Headers de getUserId:", headers);
    return this.http.get<User>(`${this.apiUrl}/${id}`, { headers });
  }

  updateUser(id: number, user: User): Observable<User> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    console.log("Headers de update:", headers);
    
    return this.http.put<User>(`${this.apiUrl}/${id}`, user, { headers });
  }

  deleteUser(id: number): Observable<void> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers });
  }

  // Crear un nuevo usuario (POST)
  createUser(user: User): Observable<User> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    
    // Aquí se envía el usuario, asegurándonos de que el rol sea un array de strings
    return this.http.post<User>(this.apiUrl, user, { headers }).pipe(
      catchError(error => {
        if (error.status === 401) {
          console.log("Token no válido o no autorizado");
        }
        return throwError(error); // Maneja el error
      })
    );
  }


}
