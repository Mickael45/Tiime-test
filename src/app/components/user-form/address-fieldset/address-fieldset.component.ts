import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { LabeledInputComponent } from '@components/labeled-input/labeled-input.component';

@Component({
  selector: 'app-address-fieldset',
  imports: [CommonModule, ReactiveFormsModule, LabeledInputComponent],
  templateUrl: './address-fieldset.component.html',
})
export class AddressFieldsetComponent {
  @Input({ required: true }) form!: FormGroup<{
    street: FormControl<string>;
    suite: FormControl<string>;
    city: FormControl<string>;
    zipcode: FormControl<string>;
    lat: FormControl<string>;
    lng: FormControl<string>;
  }>;
}
