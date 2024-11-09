// src/app/user/user-create.component.ts
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../user2.service';
import { User } from '../model/user.model';

@Component({
  selector: 'app-user-create',
  templateUrl: './user-create.component.html',
  styleUrls: ['./user-create.component.css']
})
export class UserCreateComponent implements OnInit {
  user: User;
  availableRoles: string[] = ['ROLE_PACIENTE', 'ROLE_MEDICO', 'ROLE_ADMIN'];  // Roles disponibles
  isSuccessful: boolean = false;
  isCreateFailed: boolean = false;
  errorMessage: string = ''; 
  isRolesRequired: boolean = false;

  constructor(
    private userService: UserService, 
    private router: Router
  ) {
    this.user = { id: 0, username: '', email: '', password: '', roles: [] }; 
  }

  ngOnInit(): void {}

  createUser(): void {
    if (!this.user.roles || this.user.roles.length === 0) {
      this.isRolesRequired = true;  // Si no tiene rol seleccionado, muestra el error
      return;
    }

    this.isRolesRequired = false;
    this.userService.createUser(this.user).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isCreateFailed = false;
        this.router.navigate(['/userlist']);  // Redirige a la lista de usuarios
      },
      error: (err) => {
        this.isCreateFailed = true;
        this.errorMessage = err.error.message;  // Ajusta este campo dependiendo del backend
      }
    });
  }
}
