// src/app/user/user-list.component.ts
import { Component, OnInit } from '@angular/core';
import { UserService } from '../user2.service';
import { User } from '../model/user.model';
//import { error } from 'console';
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  users: User[] = [];
  

  constructor(private userService: UserService,private bitacoraService: BitacoraService )  {}
  
  ngOnInit(): void {
    this.userService.getUsers().subscribe(
      (data) => {
      this.users = data
      },
      err => {
        console.log(err)
    }
    );
  }

  borrar(id: number) {
    const userToDelete = this.users.find(user => user.id === id);
    if (userToDelete){
      if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
        this.userService.deleteUser(id).subscribe(
          () => {
            // Filtrar la lista de usuarios para eliminar el usuario eliminado
            //if (this.user.id) {
              this.registrarAccion(userToDelete.username); 
            
            //this.bitacoraService.registrarAccion('ELIMINAR', `Usuario Eliminado: ${userToDelete.username}`);
            this.users = this.users.filter(user => user.id !== id);
            alert('Usuario eliminado con éxito');
          },
          error => {
            console.error(error);
            alert('Ocurrió un error al eliminar el usuario');
          }
        );
      }
    }
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('ELIMINAR', `Usuario Eliminado: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }
  

}
