import { Component, inject } from '@angular/core';
import { UserCreationModalComponent } from '@components/user-creation-modal/user-creation-modal.component';
import { UserListComponent } from '@components/user-list/user-list.component';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-home',
  imports: [UserListComponent, UserCreationModalComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      this.users = users;
    });
  }
}
