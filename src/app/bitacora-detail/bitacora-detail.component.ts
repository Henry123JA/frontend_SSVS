import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BitacoraService } from '../bitacora.service';
import { UserService } from '../user2.service';
import { Bitacora,User } from '../model/user.model';
//import { jsPDF } from 'jspdf'; // Importar jsPDF
declare var jsPDF: any; 
@Component({
  selector: 'app-bitacora-detail',
  templateUrl: './bitacora-detail.component.html',
  styleUrls: ['./bitacora-detail.component.css']
})
export class BitacoraDetailComponent implements OnInit {
  public bitacoras: Bitacora[] = [];
  userId: number = 0;
  public usuario: User | undefined;

  constructor(
    public bitacoraService: BitacoraService,
    public userService: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    // Obtener el userId desde la URL
    this.userId = Number(this.route.snapshot.paramMap.get('id'));
    
    // Obtener los registros de la bitácora para el usuario
    this.bitacoraService.obtenerRegistros(this.userId).subscribe(
      data => {
        this.bitacoras = data;
        //if (this.bitacoras.length > 0) {
          // Obtener la información del usuario cuando tengamos las bitácoras
          this.userService.getUserById(this.userId).subscribe(
            userData => {
              this.usuario = userData;  // Guardamos los datos del usuario
            },
            error => {
              console.error('Error al obtener los datos del usuario:', error);
            }
          );
        //}
      },
      error => {
        console.error('Error al obtener las bitácoras:', error);
      }
    );
  }

    imprimirBitacora(): void {
      window.print();
    }
}

