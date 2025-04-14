import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BasicInfoFormComponent } from './basic-info-form/basic-info-form.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-form',
  imports: [BasicInfoFormComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  userForm = new FormGroup({
    basicInfo: new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl(''),
      username: new FormControl(''),
      phone: new FormControl(''),
      website: new FormControl(''),
    }),
    address: new FormGroup({
      street: new FormControl(''),
      suite: new FormControl(''),
      city: new FormControl(''),
      zipcode: new FormControl(''),
      geo: new FormGroup({
        lat: new FormControl(''),
        lng: new FormControl(''),
      }),
    }),
    company: new FormGroup({
      name: new FormControl(''),
      catchPhrase: new FormControl(''),
      bs: new FormControl(''),
    }),
  });
}
