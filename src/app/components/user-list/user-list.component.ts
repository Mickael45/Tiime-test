import { Component, inject, OnInit } from '@angular/core';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }
}
