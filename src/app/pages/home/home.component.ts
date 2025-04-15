import { Component } from '@angular/core';
import { UserCreationModalComponent } from '@components/user-creation-modal/user-creation-modal.component';
import { UserListComponent } from '@components/user-list/user-list.component';

@Component({
  selector: 'app-home',
  imports: [UserListComponent, UserCreationModalComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {}
