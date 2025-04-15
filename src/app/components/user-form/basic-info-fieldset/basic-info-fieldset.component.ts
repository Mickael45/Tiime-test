import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { LabeledInputComponent } from '@components/labeled-input/labeled-input.component';

const fieldsToCheck = ['name', 'email', 'phone', 'website'] as const;

type FieldToCheck = (typeof fieldsToCheck)[number];

const mapFieldNameToErrorMessage: Record<FieldToCheck, string> = {
  name: 'Name is required.',
  email: 'Email is invalid.',
  phone: 'Phone number is invalid.',
  website: 'Website URL is invalid.',
};

@Component({
  selector: 'app-basic-info-fieldset',
  imports: [CommonModule, ReactiveFormsModule, LabeledInputComponent],
  templateUrl: './basic-info-fieldset.component.html',
})
export class BasicInfoFieldsetComponent {
  @Input({ required: true }) form!: FormGroup<{
    name: FormControl<string>;
    email: FormControl<string>;
    username: FormControl<string>;
    phone: FormControl<string>;
    website: FormControl<string>;
  }>;

  getFieldError(fieldName: FieldToCheck): string {
    const field = this.form.get(fieldName);

    if (field?.invalid && field.touched && field.errors) {
      return mapFieldNameToErrorMessage[fieldName];
    }
    return '';
  }
}
