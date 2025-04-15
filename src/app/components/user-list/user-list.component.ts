import { Component, Input } from '@angular/core';
import { UserCardComponent } from './user-card/user-card.component';
import { User } from '@models/user';
import { UserCardShadowComponent } from '@components/user-list/user-card/user-card-shadow.component';

@Component({
  selector: 'app-user-list',
  imports: [UserCardComponent, UserCardShadowComponent],
  templateUrl: './user-list.component.html',
})
export class UserListComponent {
  @Input() users: User[] = [];
  @Input() isLoading: boolean = false;
}
