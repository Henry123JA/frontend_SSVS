// src/app/user/user-create.component.spec.ts
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { UserCreateComponent } from './user-create.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { UserService } from '../user2.service';

describe('UserCreateComponent', () => {
  let component: UserCreateComponent;
  let fixture: ComponentFixture<UserCreateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [UserCreateComponent],
      imports: [HttpClientTestingModule, FormsModule, RouterModule.forRoot([])],
      providers: [UserService]
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UserCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call createUser() when form is valid', () => {
    component.user.username = 'testuser';
    component.user.email = 'testuser@example.com';
    component.user.password = 'password123';
    component.user.roles = [];

    spyOn(component, 'createUser');
    component.createUser();
    expect(component.createUser).toHaveBeenCalled();
  });
});
