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

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'profile', component: ProfileComponent },
  { path: 'paciente', component: BoardUserComponent },
  { path: 'medico', component: BoardModeratorComponent },
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
