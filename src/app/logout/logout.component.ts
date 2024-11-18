import { Component, OnInit } from '@angular/core';
import { TokenStorageService } from '../_services/token-storage.service';
import { BitacoraService } from '../bitacora.service';
import { Router } from '@angular/router';  // Para navegar a la página de inicio después del logout
import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-logout',
  templateUrl: './logout.component.html',
  styleUrls: ['./logout.component.css']
})
export class LogoutComponent implements OnInit {

  constructor(
    private tokenStorageService: TokenStorageService,
    private bitacoraService: BitacoraService,
    private router: Router
  ) { }

  ngOnInit(): void {
    //this.registrarAccionCierreSesion();
    this.realizarLogout();
    
  }

  // Registrar la acción de cierre de sesión en la bitácora
  registrarAccionCierreSesion(): void {
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
    this.realizarLogout();
  }

  // Realizar logout y redirigir al inicio
  realizarLogout(): void {
    
    //this.router.navigate(['/login']);   // Redirigir a la página de login o inicio
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  registrarAccion(): Observable<any> {
    // Obtener el usuario logueado
    const usuario = this.tokenStorageService.getUser();
    const tipoAccion = 'CIERRE SESION';
    const descripcionAccion = `Usuario ${usuario.username} ha cerrado sesión`;
  
    // Llamar al servicio para registrar la acción
    return this.bitacoraService.registrarAccion(tipoAccion, descripcionAccion);
  }
}
