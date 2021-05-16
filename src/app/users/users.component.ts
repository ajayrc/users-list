import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

import { Filter, FilterOption, User } from '../models/user';
import { UsersService } from '../users.service';

const DEBOUNCE_TIME = 300; // todo move to env configs
@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss'],
})
export class UsersComponent implements OnInit, OnDestroy {
  options: FilterOption[] = [
    {
      value: 'name',
      text: 'Name', // todo get from i18n
    },
    {
      value: 'username',
      text: 'User Name',
    },
    {
      value: 'email',
      text: 'Email',
    },
    {
      value: 'phone',
      text: 'Phone',
    },
    {
      value: 'website',
      text: 'Website',
    },
  ];

  users$: Observable<User[]>;
  userForm: FormGroup;

  private filterParams = new BehaviorSubject<Filter>({}); // blank value required for getting data on page load

  constructor(
    private formBuilder: FormBuilder,
    private usersService: UsersService
  ) {}

  ngOnInit(): void {
    this.createUserForm();
    this.getUsersData();
  }

  createUserForm() {
    this.userForm = this.formBuilder.group({
      filterColumn: [''],
      filterValue: [''],
    });
  }

  getUsersData() {
    this.users$ = this.filterParams.pipe(
      debounceTime(DEBOUNCE_TIME), // todo get from configs
      distinctUntilChanged(),
      switchMap((filter: Filter) => this.usersService.getUsers(filter))
    );
  }

  searchUser() {
    // get query params
    const { filterColumn, filterValue } = this.userForm.value;
    // debounce, query, refresh view
    this.filterParams.next({ filterColumn, filterValue });
  }

  ngOnDestroy() {
    // todo cleaup
  }
}
