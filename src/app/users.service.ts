import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Filter, User } from './models/user';
import { API_SERVER, USERS } from './configs';

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  constructor(private httpClient: HttpClient) {}

  getUsers(filter?: Filter): Observable<User[]> {
    // todo provide user type
    let queryString = API_SERVER + USERS;

    const { filterColumn, filterValue } = filter || {};

    if (filterColumn && filterValue) {
      // todo sanitize and encode the uri (component)
      queryString += `?${filterColumn}=${filterValue}`;
    }

    return this.httpClient
      .get<User[]>(queryString)
      .pipe(catchError(this.handleServerErrors<User[]>('getUsers', [])));
  }

  private handleServerErrors<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      // todo use error logging and analytics solution like App Insights and Winston
      console.error('UserService:: Error: ', error, operation);
      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }
}
