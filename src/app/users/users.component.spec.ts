import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { FormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { By } from '@angular/platform-browser';
import { Observable, of } from 'rxjs';
import { mockUsers } from '../mocks/users';
import { User } from '../models/user';
import { UsersService } from '../users.service';

import { UsersComponent } from './users.component';

const mockUserService = {
  getUsers(): Observable<User[]> {
    return of(mockUsers);
  },
};

describe('UsersComponent', () => {
  let component: UsersComponent;
  let fixture: ComponentFixture<UsersComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, FormsModule],
      declarations: [UsersComponent],
      providers: [
        FormBuilder,
        {
          provide: UsersService,
          useValue: mockUserService,
        },
      ],
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsersComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should create user filter form', () => {
    component.ngOnInit();
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement;

    const filterColumn = debugElement.query(By.css('#filterColumn'));
    const filterColumnNativeElement: HTMLElement = filterColumn.nativeElement;
    expect(filterColumnNativeElement).toBeDefined();

    const filterValue = debugElement.query(By.css('#filterValue'));
    const filterValueNativeElement: HTMLElement = filterValue.nativeElement;
    expect(filterValueNativeElement).toBeDefined();

    const usersList = debugElement.query(By.css('.users-list'));
    const usersListNativeElement: HTMLElement = usersList.nativeElement;
    expect(usersListNativeElement).toBeDefined();
  });

  it('should allow to search users', async(() => {
    const searchUserSpy = spyOn(component, 'searchUser').and.callThrough();

    component.ngOnInit();
    fixture.detectChanges();

    const debugElement: DebugElement = fixture.debugElement;

    const filterColumn = debugElement.query(By.css('#filterColumn'));
    const filterColumnNativeElement: HTMLSelectElement =
      filterColumn.nativeElement;

    const filterValue = debugElement.query(By.css('#filterValue'));
    const filterValueNativeElement: HTMLInputElement =
      filterValue.nativeElement;

    filterColumnNativeElement.value = 'username';
    filterValueNativeElement.value = 'Bret';

    filterValueNativeElement.dispatchEvent(new Event('keyup'));

    fixture.detectChanges();

    expect(searchUserSpy).toHaveBeenCalled();
  }));
});
