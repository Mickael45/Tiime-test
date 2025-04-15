import { Component, inject } from '@angular/core';
import { UserCreationModalComponent } from '@components/user-creation-modal/user-creation-modal.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { UnIdedUser, User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [UserListComponent, UserCreationModalComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  areUsersLoading: boolean = false;
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.getUsers();
  }

  createUser(user: UnIdedUser) {
    this.userService.createUser(user).subscribe(() => {
      this.getUsers();
    });
  }

  getUsers() {
    this.areUsersLoading = true;
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
      this.areUsersLoading = false;
      console.log(this.areUsersLoading);
    });
  }
}
