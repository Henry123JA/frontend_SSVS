import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MedicoService } from '../medico.service';  // Asegúrate de que esta ruta sea la correcta
import { Medico } from '../model/user.model'; // Asegúrate de que esta ruta sea la correcta

@Component({
  selector: 'app-medico-edit',
  templateUrl: './medico-edit.component.html',
  styleUrls: ['./medico-edit.component.css']
})
export class MedicoEditComponent implements OnInit {
  medico: Medico;
  isSuccessful: boolean = false;
  isUpdateFailed: boolean = false;
  errorMessage: string = '';

  constructor(
    private medicoService: MedicoService, 
    private route: ActivatedRoute,
    private router: Router
  ) {
    // Iniciar el objeto Medico vacío
    this.medico = { 
      id: 0, 
      ci: '', 
      sexo: '', 
      telefono: '', 
      user: { id: 0, username: '', email: '', password: '', roles: [] }
    };
  }

  ngOnInit(): void {
    const medicoId = this.route.snapshot.params['id'];
    this.medicoService.getMedicoById(medicoId).subscribe({
      next: (data) => {
        this.medico = data;

        // Inicializa los valores de 'password' si no están presentes
        if (!this.medico.user.password) {
          this.medico.user.password = ''; // Si no se envió, lo dejamos vacío
        }
      },
      error: (err) => console.error(err)
    });
  }

  updateMedico(): void {
    // Validación de cédula (CI) si es necesario
    if (!this.medico.ci) {
      
      return;
    }


    // Enviar la actualización del médico
    this.medicoService.updateMedico(this.medico.id, this.medico).subscribe({
      next: () => {
        this.isSuccessful = true;
        this.isUpdateFailed = false;
        console.log("Médico actualizado con éxito", this.medico);
        this.router.navigate(['/medico-list']); // Asegúrate de tener esta ruta
      },
      error: (err) => {
        console.log("Médico actualizado con éxito falliod......");
        this.isUpdateFailed = true;
        this.errorMessage = err.error.message;
      }
    });
  }
}
