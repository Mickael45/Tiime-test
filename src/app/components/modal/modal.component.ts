import { Component, ViewChild, ElementRef, Input } from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  standalone: true,
})
export class ModalComponent {
  @ViewChild('modalRef') modalRef!: ElementRef<HTMLDialogElement>;
  @Input() title: string = '';

  open() {
    this.modalRef.nativeElement.showModal();
  }

  close() {
    this.modalRef.nativeElement.close();
  }

  cancel() {
    this.close();
  }

  confirm() {
    this.close();
  }
}
