// src/app/user/user-edit.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute,Router } from '@angular/router';
import { UserService } from '../user2.service';
import { User } from '../model/user.model';
import { BitacoraService } from '../bitacora.service';
import { TokenStorageService } from '../_services/token-storage.service';
// src/app/user/user-edit.component.ts

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  user: User;
  availableRoles: string[] = ['ROLE_PACIENTE', 'ROLE_MEDICO', 'ROLE_ADMIN'];  // Definimos los roles disponibles
  isSuccessful: boolean = false;
  isUpdateFailed: boolean = false;
  errorMessage: string = ''; 
  isRolesRequired: boolean = false;

  constructor(
    private userService: UserService, 
    private route: ActivatedRoute,
    private router: Router,
    private bitacoraService: BitacoraService ,
    private tokenStorageService: TokenStorageService 
  ) {
    this.user = { id: 0, username: '', email: '', password: '', roles: [] };  // Inicia con roles vacíos
  }

  ngOnInit(): void {
    const userId = this.route.snapshot.params['id'];
    this.userService.getUserById(userId).subscribe({
      next: (data) => {
        this.user = data;
  
        // Asegurarnos de que 'password' exista en el objeto 'user' (inicializarlo si no existe)
        if (this.user.password === undefined) {
          this.user.password = '';  // Si no se envió la contraseña, inicializarla como cadena vacía
        }
  
        // Ajustar roles al recibir los datos del backend
        if (!this.user.roles) {
          this.user.roles =  this.user.roles ?? [];  // Asegúrate de que tenga al menos un valor
        }
        
      },
      error: (err) => console.error(err)
    });
  }
 
  updateUser(): void {
    if (!this.user.roles || this.user.roles.length === 0) {
      this.isRolesRequired = true;  // Si no tiene rol seleccionado, muestra el error
      return;
    }
  
    this.isRolesRequired = false;  // Reseteamos la validación de roles
    console.log("antes de enviarlo...", this.user,"mas el id",this.user.id);
    // Enviar directamente this.user sin ninguna modificación
    this.userService.updateUser(this.user.id, this.user).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isUpdateFailed = false;
        console.log("Registrado con exito...", this.user);
        //const currentUser = this.tokenStorageService.getUser();
        //const currentUsername = currentUser.username; 
        this.registrarAccion(this.user.username);
        this.router.navigate(['/userlist']);
      },
      error: (err) => {
        this.isUpdateFailed = true;
        this.errorMessage = err.error.message;  // Ajusta este campo dependiendo del backend
      }
    });
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('EDITAR', `Usuario Editado: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
  
}






