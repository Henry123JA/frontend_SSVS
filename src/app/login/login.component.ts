import { Component, OnInit } from '@angular/core';
import { AuthService } from '../_services/auth.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { BitacoraService } from '../bitacora.service';
import { HttpErrorResponse } from '@angular/common/http'; 
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  form: any = {
    username: null,
    password: null
  };
  isLoggedIn = false;
  isLoginFailed = false;
  errorMessage = '';
  roles: string[] = [];

  constructor(private authService: AuthService, private tokenStorage: TokenStorageService,
    private bitacoraService: BitacoraService ) { }
  ngOnInit(): void {
    if (this.tokenStorage.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorage.getUser().roles;
    }
  }

  onSubmit(): void {
    const { username, password } = this.form;
    
    this.authService.login(username, password).subscribe({
      next: data => {
        //console.log('Login exitoso:', data);
        this.tokenStorage.saveToken(data.accessToken);
        this.tokenStorage.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorage.getUser().roles;

        this.registrarAccion().subscribe(
          () => {
            // Una vez registrada la acción correctamente, recargamos la página
            this.reloadPage();
          },
          (err: HttpErrorResponse) => {
            console.error('Error al registrar acción: ', err);
          }
        );

        
      },
      error: (err: HttpErrorResponse) => {
        console.error('Error en el inicio de sesión:', err);
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    });

  }

  reloadPage(): void {
    window.location.reload();
  }

  registrarAccion(): Observable<any> {
    // Obtener el usuario logueado
    const usuario = this.tokenStorage.getUser();
    const tipoAccion = 'INICIO SESION';
    const descripcionAccion = `Usuario ${usuario.username} ha iniciado sesión`;
  
    // Llamar al servicio para registrar la acción
    return this.bitacoraService.registrarAccion(tipoAccion, descripcionAccion);
  }
  


}

