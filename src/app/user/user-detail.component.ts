// src/app/user/user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user2.service';  // Asegúrate de importar tu servicio
import { User } from '../model/user.model';    // Ajusta la ruta si es necesario
import { BitacoraService } from '../bitacora.service';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  errorMessage: string = '';
  name : string = '';
  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router,
    private bitacoraService: BitacoraService 
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario desde la URL
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          this.user = user;  // Asignar los datos al modelo
          if (this.user) {
            this.registrarAccion(this.user.username); 
          }
        },
        error: (err) => {
          this.errorMessage = 'Error al cargar los datos del usuario.';
          console.error(err);
        }
      });
    }
  }

  goBackToList(): void {
    this.router.navigate(['/userlist']);
  }

  registrarAccion(name: string): void {
    // Usamos el nombre del usuario para registrar la acción
    this.bitacoraService.registrarAccion('VER', `Usuario Visto: ${name}`).subscribe(
      (bitacora) => {
        console.log('Acción registrada: ', bitacora);
      },
      (err) => {
        console.error('Error al registrar acción: ', err);
      }
    );
  }


}
