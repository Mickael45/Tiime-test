import { Component, inject, OnInit } from '@angular/core';
import { User } from '@models/user';
import { UserService } from '@services/user.service';
import { UserCardComponent } from './user-card/user-card.component';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
