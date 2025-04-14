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
  selector: 'app-basic-info-form',
  imports: [CommonModule, ReactiveFormsModule, LabeledInputComponent],
  templateUrl: './basic-info-form.component.html',
})
export class BasicInfoFormComponent {
  @Input({ required: true }) form!: FormGroup<{
    name: FormControl<string | null>;
    email: FormControl<string | null>;
    username: FormControl<string | null>;
    phone: FormControl<string | null>;
    website: FormControl<string | null>;
  }>;

  getFieldError(fieldName: FieldToCheck): string {
    const field = this.form.get(fieldName);

    if (field?.invalid && field.touched && field.errors) {
      return mapFieldNameToErrorMessage[fieldName];
    }
    return '';
  }
}
