// src/app/user/user-detail.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../user2.service';  // Asegúrate de importar tu servicio
import { User } from '../model/user.model';    // Ajusta la ruta si es necesario

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css']
})
export class UserDetailComponent implements OnInit {
  user: User | null = null;
  errorMessage: string = '';

  constructor(
    private userService: UserService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Obtener el ID del usuario desde la URL
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.userService.getUserById(Number(userId)).subscribe({
        next: (user) => {
          this.user = user;  // Asignar los datos al modelo
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
}
