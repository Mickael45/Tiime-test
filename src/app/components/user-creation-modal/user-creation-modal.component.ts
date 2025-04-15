import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { User } from '@models/user';

@Component({
  selector: 'app-user-creation-modal',
  imports: [UserFormComponent],
  templateUrl: './user-creation-modal.component.html',
})
export class UserCreationModalComponent {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @Input() title: string = '';

  open() {
    console.log('Opening');
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

  createUser(user: Omit<User, 'id'>) {
    console.log('User created', user);
    this.close();
  }
}
