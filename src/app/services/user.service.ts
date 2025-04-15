import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '@models/user';
import { map, Observable } from 'rxjs';
import { isUser } from './user.guards';

const API_URL = 'https://jsonplaceholder.typicode.com/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http
      .get<User[]>(API_URL)
      .pipe(
        map((users) =>
          users
            .map((user) => (isUser(user) ? user : null))
            .filter((user) => user !== null)
        )
      );
  }
}
