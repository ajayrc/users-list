import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Observable, of } from 'rxjs';
import { mockUsers } from '../mocks/users';
import { User } from '../models/user';
import { UsersService } from '../users.service';

import { UsersComponent } from './users.component';

const mockUserService = {
  getUsers(): Observable<User[]> {
    return of(mockUsers)
  }
}

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        ReactiveFormsModule,
        FormsModule
      ],
      declarations: [ UsersComponent ],
      providers: [
        {
          provide: UsersService, useValue: mockUserService
        }
      ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    component.ngOnInit();

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
