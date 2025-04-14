import { Component, inject, OnInit, ViewChild } from '@angular/core';
import { ModalComponent } from '@components/modal/modal.component';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { User } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-list',
  imports: [ModalComponent, UserFormComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent implements OnInit {
  @ViewChild('modal') modal!: ModalComponent;
  userService = inject(UserService);
  users: User[] = [];

  ngOnInit() {
    this.userService.getUsers().subscribe((users) => {
      console.log(users);
      this.users = users;
    });
  }
}
