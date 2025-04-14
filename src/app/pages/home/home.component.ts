import { Component, ViewChild } from '@angular/core';
import { UserCreationModalComponent } from '@components/user-creation-modal/user-creation-modal.component';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { UserListComponent } from '@components/user-list/user-list.component';

@Component({
  selector: 'app-home',
  imports: [UserListComponent, UserCreationModalComponent, UserFormComponent],
  templateUrl: './home.component.html',
})
export class HomeComponent {
  @ViewChild('modal') modal!: UserCreationModalComponent;
}
