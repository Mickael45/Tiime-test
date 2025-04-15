import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UnIdedUser, User } from '@models/user';
import { map, Observable, tap } from 'rxjs';
import { isUser } from './user.guards';
import { isPost } from './post.guards';
import { Post } from '@models/post';
import { ToastService } from './toast.service';

const API_URL = 'https://tiime-test.vercel.app/users';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private http: HttpClient, private toast: ToastService) {}

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

  getUserById(id: string): Observable<User | null> {
    return this.http
      .get<User>(`${API_URL}/${id}`)
      .pipe(map((user) => (isUser(user) ? user : null)));
  }

  getPosts(userId: string): Observable<Post[]> {
    return this.http
      .get<Post[]>(`${API_URL}/${userId}/posts`)
      .pipe(
        map((posts) =>
          posts
            .map((post) => (isPost(post) ? post : null))
            .filter((user) => user !== null)
        )
      );
  }

  createUser(user: UnIdedUser): Observable<User | null> {
    return this.http
      .post<User>(API_URL, user)
      .pipe(map((user) => (isUser(user) ? user : null)))
      .pipe(
        tap(() => {
          this.toast.showToast('User Created', 'success');
        })
      );
  }

  updateUser(user: User): Observable<User | null> {
    return this.http
      .put<User>(`${API_URL}/${user.id}`, user)
      .pipe(map((user) => (isUser(user) ? user : null)))
      .pipe(
        tap(() => {
          this.toast.showToast('User Updated!', 'success');
        })
      );
  }
}
