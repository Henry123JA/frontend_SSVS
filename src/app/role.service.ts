import { Injectable } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';

@Injectable({
  providedIn: 'root'
})
export class RoleService {

  constructor(private tokenStorageService: TokenStorageService) { }
  // esto sirve solo para saber el rol
  // Método que verifica si el usuario autenticado tiene el rol dado
  hasRole(role: string): boolean {
    const user = this.tokenStorageService.getUser();
    if (user && user.roles) {
      return user.roles.includes(role);
    }
    return false;
  }
}
