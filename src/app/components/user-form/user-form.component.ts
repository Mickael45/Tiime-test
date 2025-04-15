import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Company, UnIdedUser, User } from '@models/user';
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

const fromFormToUser = (formValue: UserFormGroup): UnIdedUser => {
  const { basicInfo, address, company } = formValue;
  const { lat, lng, ...addressWithoutGeo } = address;

  return {
    ...basicInfo,
    address: {
      ...addressWithoutGeo,
      geo: {
        lat,
        lng,
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
export class UserFormComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() user!: User;
  @Output() createUser = new EventEmitter<UnIdedUser>();
  @Output() updateUser = new EventEmitter<User>();

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

  ngOnInit() {
    if (this.user) {
      this.userForm.patchValue({
        basicInfo: {
          name: this.user.name,
          email: this.user.email,
          username: this.user.username,
          phone: this.user.phone,
          website: this.user.website,
        },
        address: {
          street: this.user.address.street,
          suite: this.user.address.suite,
          city: this.user.address.city,
          zipcode: this.user.address.zipcode,
          lat: this.user.address.geo.lat,
          lng: this.user.address.geo.lng,
        },
        company: {
          name: this.user.company.name,
          catchPhrase: this.user.company.catchPhrase,
          bs: this.user.company.bs,
        },
      });
    }
  }

  get isFormDifferent(): boolean {
    if (this.mode === 'create') return false;

    const { basicInfo, address, company } = this.userForm.getRawValue();
    const { name, email, username, phone, website } = this.user;
    const { street, suite, city, zipcode } = this.user.address;
    const { lat, lng } = this.user.address.geo;
    const { name: companyName, catchPhrase, bs } = this.user.company;

    return (
      basicInfo.name !== name ||
      basicInfo.email !== email ||
      basicInfo.username !== username ||
      basicInfo.phone !== phone ||
      basicInfo.website !== website ||
      address.street !== street ||
      address.suite !== suite ||
      address.city !== city ||
      address.zipcode !== zipcode ||
      address.lat !== lat ||
      address.lng !== lng ||
      company.name !== companyName ||
      company.catchPhrase !== catchPhrase ||
      company.bs !== bs
    );
  }

  handleSubmit() {
    if (this.mode === 'create') {
      this.createUser.emit(fromFormToUser(this.userForm.getRawValue()));
      return;
    }
    this.updateUser.emit({
      ...fromFormToUser(this.userForm.getRawValue()),
      id: this.user.id,
    });
  }
}
