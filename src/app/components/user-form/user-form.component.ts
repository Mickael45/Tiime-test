import { Component, EventEmitter, Input, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Company, User } from '@models/user';
import { BasicInfoFieldsetComponent } from './basic-info-fieldset/basic-info-fieldset.component';
import { CompanyFieldsetComponent } from './company-fieldset/company-fieldset.component';
import { AddressFieldsetComponent } from './address-fieldset/address-fieldset.component';

type BasicInfo = {
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
};

type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  lat: string;
  lng: string;
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
    address: {
      ...address,
      geo: {
        lat: address.lat,
        lng: address.lng,
      },
    },
    company,
  };
};

@Component({
  selector: 'app-user-form',
  imports: [
    BasicInfoFieldsetComponent,
    CompanyFieldsetComponent,
    AddressFieldsetComponent,
    CommonModule,
    ReactiveFormsModule,
  ],
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
      lat: new FormControl('', { nonNullable: true }),
      lng: new FormControl('', { nonNullable: true }),
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
