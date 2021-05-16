import { TestBed } from '@angular/core/testing';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';

import { UsersService } from './users.service';
import { mockUsers } from './mocks/users';
import { HttpClient } from '@angular/common/http';
import { Filter, User } from './models/user';
import { API_SERVER, USERS } from './configs';

describe('UsersService', () => {
  let service: UsersService;
  let httpMock: HttpTestingController;
  let httpClient: HttpClient;
  let baseUrl = API_SERVER + USERS;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });

    httpClient = TestBed.inject(HttpClient);
    httpMock = TestBed.inject(HttpTestingController);

    service = TestBed.inject(UsersService);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return all users when no filter applied', () => {
    let users: User[];
    service.getUsers().subscribe((usersData) => {
      users = usersData;
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: baseUrl,
    });

    req.flush(mockUsers);

    expect(users).toEqual([...mockUsers]);
  });

  it('should return specific users when a filter is applied', () => {
    let users: User[];

    const filter: Filter = {
      filterColumn: 'username',
      filterValue: 'Bret',
    };

    service.getUsers(filter).subscribe((usersData) => {
      users = usersData;
    });

    const req = httpMock.expectOne({
      method: 'GET',
      url: `${baseUrl}?${filter.filterColumn}=${filter.filterValue}`,
    });

    req.flush([mockUsers[0]]);

    expect(users).toEqual([mockUsers[0]]);
  });

  it('should handle api errors gracefully', () => {
    let users: User[];

    const filter: Filter = {
      filterColumn: 'username',
      filterValue: 'Bret',
    };

    service.getUsers(filter).subscribe((usersData) => {
      users = usersData;
    });

    httpMock
      .expectOne({
        method: 'GET',
        url: `${baseUrl}?${filter.filterColumn}=${filter.filterValue}`,
      })
      .error(new ErrorEvent('test error'));

    expect(users).toEqual([]);
  });
});
