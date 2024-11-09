import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { TokenStorageService } from '../_services/token-storage.service';

const API_URL = 'http://localhost:8080/api/test/';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient, private tokenStorage: TokenStorageService) { }

  getPublicContent(): Observable<any> {
    return this.http.get(API_URL + 'all', { responseType: 'text' });
  }


  getUserBoard(): Observable<any> {
    const token = this.tokenStorage.getToken(); // Obtener el token desde TokenStorageService

    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(API_URL + 'paciente', { headers, responseType: 'text' });
  }

  getModeratorBoard(): Observable<any> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(API_URL + 'medico', { headers, responseType: 'text' });
  }
 
  getAdminBoard(): Observable<any> {
    const token = this.tokenStorage.getToken();
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    return this.http.get(API_URL + 'admin', { headers, responseType: 'text' });
  }
}
