import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-labeled-input',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './labeled-input.component.html',
})
export class LabeledInputComponent {
  @Input() label: string = '';
  @Input() control!: FormControl;

  getErrorMessage(): string {
    if (this.control.errors?.['required']) return 'This field is required.';
    if (this.control.errors?.['email']) return 'Please enter a valid email.';
    return 'Invalid value.';
  }
}
