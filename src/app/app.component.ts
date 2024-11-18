import { Component } from '@angular/core';
import { TokenStorageService } from './_services/token-storage.service';
import { BitacoraService } from './bitacora.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  private roles: string[] = [];
  title = 'Angular13JwtAuth';
  isLoggedIn = false;
  showAdminBoard = false;
  showModeratorBoard = false;
  showUserBoard = false;
  username?: string;

  constructor(private tokenStorageService: TokenStorageService,
              private bitacoraService: BitacoraService,
              private router: Router) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();

    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;

      this.showAdminBoard = this.roles.includes('ROLE_ADMIN');
      this.showModeratorBoard = this.roles.includes('ROLE_MEDICO');
      this.showUserBoard = this.roles.includes('ROLE_PACIENTE'); 

      this.username = user.username;
    }
  }
  
  logout(): void {
    const usuario = this.tokenStorageService.getUser();
    const tipoAccion = 'CIERRE SESION';
    const descripcionAccion = `Usuario ${usuario.username} ha cerrado sesión`;

    // Llamar al servicio de bitácora para registrar la acción
    this.bitacoraService.registrarAccion(tipoAccion, descripcionAccion).subscribe(
      (bitacora) => {
        console.log('Acción de cierre de sesión registrada: ', bitacora);
        
      },
      (err) => {
        console.error('Error al registrar la acción de cierre de sesión: ', err);
        // Si falla el registro, puedes mostrar un mensaje o proceder igual con el logout
        
      }
    );
    
    this.router.navigate(['/logout']);  
  }

 
}
