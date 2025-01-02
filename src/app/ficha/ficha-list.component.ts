// src/app/ficha/ficha-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FichaService } from '../ficha.service';  // Servicio para manejar fichas
import { RoleService } from '../role.service';
import { TokenStorageService } from '../_services/token-storage.service';
import { Router } from '@angular/router';
import { Ficha } from '../model/user.model';  // Modelo de ficha

@Component({
  selector: 'app-ficha-list',
  templateUrl: './ficha-list.component.html',
  styleUrls: ['./ficha-list.component.css']
})
export class FichaListComponent implements OnInit {
  public fichas: Ficha[] = [];  // Lista de fichas
  public userId: number = 0 ; 

  constructor(
    public fichaService: FichaService,  // Servicio para gestionar fichas
    public router: Router,  // Router para navegación
    public RoleService: RoleService,
    private tokenStorage: TokenStorageService,
  ) {}

  ngOnInit(): void {
    const usuario = this.tokenStorage.getUser(); // Obtener el usuario logueado del almacenamiento
    this.userId = usuario.id; 

    if(this.RoleService.hasRole("ROLE_ADMIN")){
      this.loadFichas();
    }else{
      if(this.RoleService.hasRole("ROLE_MEDICO")){
        this.loadFichasMed();
      }else{
        this.loadFichasPac();
      }
      
    }
  }

  // Obtener la lista de todas las fichas
  loadFichas(): void {
    this.fichaService.getFichas().subscribe(
      (data) => {
        this.fichas = data;  // Asignamos los datos de las fichas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }

  // Obtener la lista de todas las fichas de un paciente
  loadFichasPac(): void {
    this.fichaService.getFichasByPaciente(this.userId).subscribe(
      (data) => {
        this.fichas = data;  // Asignamos los datos de las fichas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }

  // Obtener la lista de todas las fichas de un medico
  loadFichasMed(): void {
    this.fichaService.getFichasByMedico(this.userId).subscribe(
      (data) => {
        this.fichas = data;  // Asignamos los datos de las fichas a la propiedad
      },
      (error) => {
        console.error('Error al obtener las fichas:', error);
      }
    );
  }

  // Eliminar una ficha
  borrar(id: number): void {
    if (confirm('¿Estás seguro de que deseas eliminar esta ficha?')) {
      this.fichaService.deleteFicha(id).subscribe(
        () => {
          this.loadFichas();  // Recargar la lista después de eliminar
        },
        (error) => {
          console.error('Error al eliminar la ficha:', error);
        }
      );
    }
  }

  // Ver los detalles de una ficha
  verDetalles(fichaId: number): void {
    this.router.navigate(['/ficha-detail', fichaId]);  // Redirige al componente de detalles de la ficha
  }

  // Función para imprimir la ficha con un diseño mejorado
  imprimirFicha(fichaId: number): void {
    // Encontrar la ficha correspondiente
    const ficha = this.fichas.find(f => f.id === fichaId);

    if (ficha) {
      // Obtener el bloque horario de la ficha
      const bloqueHorario = ficha.bloqueHorario;

      // Formatear la hora de inicio y hora de fin
      const horaInicio = bloqueHorario.horaInicio;
      const horaFin = bloqueHorario.horaFin;
      //console.log("id horario...: ",ficha.bloqueHorario.horario.id);
      const duracion = bloqueHorario.duracion;  // Duración de la cita en minutos

      // Crear el contenido HTML con un diseño más formal para la ficha clínica
      const fichaHTML = `
        <html>
          <head>
            <title>Ficha de Cita Médica - ${ficha.id}</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                margin: 0;
                padding: 20px;
                background-color: #f4f4f4;
              }
              .ficha {
                width: 80%;
                margin: 20px auto;
                padding: 20px;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
              }
              .ficha h2 {
                text-align: center;
                color: #333;
              }
              .ficha table {
                width: 100%;
                border-collapse: collapse;
                margin-top: 20px;
              }
              .ficha th, .ficha td {
                padding: 12px;
                text-align: left;
                border: 1px solid #ddd;
              }
              .ficha th {
                background-color: #007bff;
                color: white;
                text-align: center;
              }
              .ficha td {
                font-size: 14px;
              }
              .ficha .heading {
                background-color: #f8f8f8;
                padding: 10px;
                font-size: 16px;
                font-weight: bold;
                color: #555;
              }
              .footer {
                text-align: center;
                margin-top: 30px;
                font-size: 12px;
                color: #888;
              }
            </style>
          </head>
          <body>
            <div class="ficha">
              <h2>Ficha de Cita Médica</h2>
              <div class="heading">Detalles de la Cita</div>
              <table>
                <tr><th>ID de Ficha</th><td>${ficha.id}</td></tr>
                <tr><th>Paciente</th><td>${ficha.paciente.user.username}</td></tr>
                <tr><th>Médico</th><td>${ficha.medicoId}</td></tr>
                <tr><th>Especialidad</th><td>${ficha.especialidad.nombre}</td></tr>
                <tr><th>Fecha</th><td>${ficha.fecha}</td></tr>
                <tr><th>Hora de la Cita</th><td>${ficha.hora}</td></tr>
                <tr><th>Estado</th><td>${ficha.estado}</td></tr>
              </table>
              
              <div class="heading">Detalles del Horario</div>
              <table>
                <tr><th>Hora de Inicio</th><td>${horaInicio}</td></tr>
                <tr><th>Hora de Fin</th><td>${horaFin}</td></tr>
                <tr><th>Duración</th><td>${duracion} minutos</td></tr>
              </table>

              <div class="footer">
                <p>Este documento fue generado automáticamente. ¡Gracias por confiar en nosotros!</p>
              </div>
            </div>
          </body>
        </html>`;

      // Intentar abrir una nueva ventana
      const printWindow = window.open('', '', 'height=600,width=800');

      if (printWindow) {
        // Si la ventana se abre correctamente, escribir el contenido HTML
        printWindow.document.write(fichaHTML);
        printWindow.document.close();
        
        // Llamar a la función de impresión
        printWindow.print();
      } else {
        // Si la ventana no se abre, mostrar una advertencia
        alert('No se pudo abrir la ventana para imprimir. Puede que los pop-ups estén bloqueados en su navegador.');
      }
    } else {
      alert('Ficha no encontrada');
    }
  }
}