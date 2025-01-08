import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { UserCreateComponent } from './user/user-create.component';
import { UserListComponent } from './user/user-list.component';
import { UserEditComponent } from './user/user-edit.component';
import { UserDetailComponent } from './user/user-detail.component'; 

import { MedicoListComponent } from './medico/medico-list.component';
import { MedicoCreateComponent } from './medico/medico-create.component'; 
import { MedicoDetailComponent } from './medico/medico-detail.component'; 
import { MedicoEditComponent } from './medico/medico-edit.component';
import { PacienteListComponent } from './paciente/paciente-list.component';
import { PacienteCreateComponent } from './paciente/paciente-create.component';
import { PacienteDetailComponent } from './paciente/paciente-detail.component';

import { BitacoraDetailComponent } from './bitacora-detail/bitacora-detail.component';
import { EspecialidadListComponent } from './especialidad/especialidad-list.component';
import { EspecialidadCreateComponent } from './especialidad/especialidad-create.component';

import { MedicoEspecialidadListComponent } from './medico/medico-especialidad-list.component';

import { HorarioListComponent } from './horario/horario-list.component';
import { HorarioCreateComponent } from './horario/horario-create.component';
import { BloqueHorarioListComponent } from './horario/bloque-horario-list.component';

import { FichaListComponent } from './ficha/ficha-list.component';
import { FichaCreateComponent } from './ficha/ficha-create.component';

import { RecetaListComponent } from './receta/receta-list.component';
import { RecetaCreateComponent } from './receta/receta-create.component';

import { ConsultaListComponent } from './consulta/consulta-list.component';
import { ConsultaCreateComponent } from './consulta/consulta-create.component';

import { AntecedenteListComponent } from './antecedente/antecedente-list.component';
import { AntecedenteCreateComponent } from './antecedente/antecedente-create.component';
import { AntecedenteUpdateComponent } from './antecedente/antecedente-update.component';

import { TratamientoListComponent } from './tratamiento/tratamiento-list.component';
import { TratamientoCreateComponent } from './tratamiento/tratamiento-create.component';

import { ExamenListComponent } from './examen/examen-list.component';
import { ExamenCreateComponent } from './examen/examen-create.component';

import { HistorialComponent } from './historial/historial.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'logout', component: LogoutComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'paciente', component: BoardUserComponent },
  { path: 'medico2', component: BoardModeratorComponent },
  { path: 'bitacora/:id', component: BitacoraDetailComponent }, 

  { path: 'medico-list', component: MedicoListComponent },
  { path: 'medico-create', component: MedicoCreateComponent }, 
  { path: 'medico-detail/:id', component: MedicoDetailComponent }, 
  { path: 'medico-edit/:id', component: MedicoEditComponent },

  { path: 'paciente-list', component: PacienteListComponent },
  { path: 'paciente-create', component: PacienteCreateComponent },
  { path: 'paciente-detail/:id', component: PacienteDetailComponent },

  { path: 'especialidadlist', component: EspecialidadListComponent },
  { path: 'especialidad/create', component: EspecialidadCreateComponent },

  { path: 'medico-especialidad-list', component: MedicoEspecialidadListComponent },

  { path: 'horario-list', component: HorarioListComponent },
  { path: 'horario-create', component: HorarioCreateComponent },
  { path: 'bloques-horario/:horarioId', component: BloqueHorarioListComponent },

  { path: 'ficha-list', component: FichaListComponent },
  { path: 'ficha-create', component: FichaCreateComponent },

  { path: 'receta-list', component: RecetaListComponent },
  { path: 'receta-create', component: RecetaCreateComponent },

  { path: 'tratamiento-list', component: TratamientoListComponent },
  { path: 'tratamiento-create', component: TratamientoCreateComponent },

  { path: 'examen-list', component: ExamenListComponent },
  { path: 'examen-create', component: ExamenCreateComponent },

  { path: 'consulta-list', component: ConsultaListComponent },
  { path: 'consulta-create', component: ConsultaCreateComponent },

  { path: 'historial/:id', component: HistorialComponent },


  { path: 'antecedente-list', component: AntecedenteListComponent },
  { path: 'antecedente-create', component: AntecedenteCreateComponent },
  { path: 'antecedente-update/:id', component: AntecedenteUpdateComponent },

  { path: 'admin', component: BoardAdminComponent },
  //{ path: 'user/list', component: UserListComponent },
  //{ path: 'user/edit/:id', component: UserEditComponent },
  { path: 'userdetail/:id', component: UserDetailComponent },
  { path: 'usercreate', component: UserCreateComponent },
  { path: 'userlist', component: UserListComponent }, // Ruta para listar usuarios
  { path: 'editUser/:id', component: UserEditComponent }, // Ruta para editar usuario
  //{ path: '', redirectTo: '/users', pathMatch: 'full' },
  { path: '', redirectTo: 'home', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
