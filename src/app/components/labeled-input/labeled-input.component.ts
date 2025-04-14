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
  @Input() type: string = 'text';
  @Input() error: string = '';
}
