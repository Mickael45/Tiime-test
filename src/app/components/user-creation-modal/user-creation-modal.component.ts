import { Component, ElementRef, inject, Input, ViewChild } from '@angular/core';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { UnIdedUser } from '@models/user';
import { UserService } from '@services/user.service';

@Component({
  selector: 'app-user-creation-modal',
  imports: [UserFormComponent],
  templateUrl: './user-creation-modal.component.html',
})
export class UserCreationModalComponent {
  userService = inject(UserService);
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @Input() title: string = '';

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

  createUser(user: UnIdedUser) {
    this.userService.createUser(user).subscribe(() => {
      this.close();
    });
  }
}
