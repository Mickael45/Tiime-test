import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-basic-info-form',
  imports: [CommonModule, ReactiveFormsModule],
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
}
