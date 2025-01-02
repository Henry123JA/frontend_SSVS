import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { BoardAdminComponent } from './board-admin/board-admin.component';
import { BoardModeratorComponent } from './board-moderator/board-moderator.component';
import { BoardUserComponent } from './board-user/board-user.component';
import { UserListComponent } from './user/user-list.component'; // Ajusta la ruta según tu estructura
import { UserEditComponent } from './user/user-edit.component';
import { UserService } from './user2.service';
import { EspecialidadService } from './especialidad.service';
import { UserCreateComponent } from './user/user-create.component';
import { UserDetailComponent } from './user/user-detail.component'; 
import { MedicoListComponent } from './medico/medico-list.component';
import { MedicoCreateComponent } from './medico/medico-create.component'; 
import { MedicoDetailComponent } from './medico/medico-detail.component';
import { MedicoEditComponent } from './medico/medico-edit.component';
import { PacienteListComponent } from './paciente/paciente-list.component';
import { PacienteCreateComponent } from './paciente/paciente-create.component';
import { PacienteDetailComponent } from './paciente/paciente-detail.component';
import { EspecialidadListComponent } from './especialidad/especialidad-list.component';
import { EspecialidadCreateComponent } from './especialidad/especialidad-create.component';
import { MedicoEspecialidadListComponent } from './medico/medico-especialidad-list.component';
import { authInterceptorProviders } from './_helpers/auth.interceptor';
import { BitacoraDetailComponent } from './bitacora-detail/bitacora-detail.component';
import { HorarioListComponent } from './horario/horario-list.component';
import { HorarioCreateComponent } from './horario/horario-create.component';
import { FichaListComponent } from './ficha/ficha-list.component';
import { FichaCreateComponent } from './ficha/ficha-create.component';
import { BloqueHorarioListComponent } from './horario/bloque-horario-list.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    ProfileComponent,
    BoardAdminComponent,
    BoardModeratorComponent,
    BoardUserComponent,
    UserListComponent,
    UserEditComponent,
    UserCreateComponent,
    UserDetailComponent,
    MedicoListComponent,
    MedicoCreateComponent,
    MedicoDetailComponent,
    MedicoEditComponent,
    EspecialidadListComponent,
    EspecialidadCreateComponent,
    MedicoEspecialidadListComponent,
    PacienteListComponent,
    PacienteCreateComponent,
    PacienteDetailComponent,
    HorarioListComponent,
    HorarioCreateComponent,
    FichaListComponent,
    FichaCreateComponent,
    BloqueHorarioListComponent,
    BitacoraDetailComponent,
    LogoutComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [authInterceptorProviders],
  bootstrap: [AppComponent]
})
export class AppModule { }
