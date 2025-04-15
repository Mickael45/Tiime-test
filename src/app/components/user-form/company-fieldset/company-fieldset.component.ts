import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabeledInputComponent } from '@components/labeled-input/labeled-input.component';

@Component({
  selector: 'app-company-fieldset',
  imports: [CommonModule, ReactiveFormsModule, LabeledInputComponent],
  templateUrl: './company-fieldset.component.html',
})
export class CompanyFieldsetComponent {
  @Input({ required: true }) form!: FormGroup<{
    name: FormControl<string>;
    catchPhrase: FormControl<string>;
    bs: FormControl<string>;
  }>;
}
