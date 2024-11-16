import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
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

import { EspecialidadListComponent } from './especialidad/especialidad-list.component';
import { EspecialidadCreateComponent } from './especialidad/especialidad-create.component';

import { MedicoEspecialidadListComponent } from './medico/medico-especialidad-list.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'paciente', component: BoardUserComponent },
  { path: 'medico2', component: BoardModeratorComponent },

  { path: 'medico-list', component: MedicoListComponent },
  { path: 'medico-create', component: MedicoCreateComponent }, 
  { path: 'medico-detail/:id', component: MedicoDetailComponent }, 
  { path: 'medico-edit/:id', component: MedicoEditComponent },

  { path: 'especialidadlist', component: EspecialidadListComponent },
  { path: 'especialidad/create', component: EspecialidadCreateComponent },

  { path: 'medico-especialidad-list', component: MedicoEspecialidadListComponent },

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
