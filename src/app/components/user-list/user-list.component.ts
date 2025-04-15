import { Component, Input } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { User } from '@models/user';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() users: User[] = [];
}
