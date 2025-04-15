import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { UserFormComponent } from '@components/user-form/user-form.component';
import { UnIdedUser } from '@models/user';

@Component({
  selector: 'app-user-creation-modal',
  imports: [UserFormComponent],
  templateUrl: './user-creation-modal.component.html',
})
export class UserCreationModalComponent {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @Input() title: string = '';
  @Output() createUser = new EventEmitter<UnIdedUser>();

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

  onSubmit(user: UnIdedUser) {
    this.createUser.emit(user);
    this.close();
  }
}
