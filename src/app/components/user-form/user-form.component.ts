import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BasicInfoFormComponent } from './basic-info-form/basic-info-form.component';
import { CommonModule } from '@angular/common';
import { Address, Company, User } from '@models/user';

type BasicInfo = {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
};

type UserFormGroup = {
  basicInfo: BasicInfo;
  address: Address;
  company: Company;
};

const fromFormToUser = (formValue: UserFormGroup): Omit<User, 'id'> => {
  const { basicInfo, address, company } = formValue;

  return {
    ...basicInfo,
    address,
    company,
  };
};

@Component({
  selector: 'app-user-form',
  imports: [BasicInfoFormComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './user-form.component.html',
})
export class UserFormComponent {
  @Input() mode: 'create' | 'edit' = 'create';
  @Output() onSubmit = new EventEmitter<Omit<User, 'id'>>();

  userForm = new FormGroup({
    basicInfo: new FormGroup({
      name: new FormControl('', {
        nonNullable: true,
        validators: Validators.required,
      }),
      email: new FormControl('', {
        nonNullable: true,
        validators: Validators.email,
      }),
      username: new FormControl('', { nonNullable: true }),
      phone: new FormControl('', {
        nonNullable: true,
        validators: Validators.pattern('^\\+?[0-9]*$'),
      }),
      website: new FormControl('', {
        nonNullable: true,
        validators: Validators.pattern('https?://.+'),
      }),
    }),
    address: new FormGroup({
      street: new FormControl('', { nonNullable: true }),
      suite: new FormControl('', { nonNullable: true }),
      city: new FormControl('', { nonNullable: true }),
      zipcode: new FormControl('', { nonNullable: true }),
      geo: new FormGroup({
        lat: new FormControl('', { nonNullable: true }),
        lng: new FormControl('', { nonNullable: true }),
      }),
    }),
    company: new FormGroup({
      name: new FormControl('', { nonNullable: true }),
      catchPhrase: new FormControl('', { nonNullable: true }),
      bs: new FormControl('', { nonNullable: true }),
    }),
  });

  handleSubmit() {
    this.onSubmit.emit(fromFormToUser(this.userForm.getRawValue()));
  }
}
