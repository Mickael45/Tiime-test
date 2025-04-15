import { Component } from '@angular/core';
import { BasicInfoFieldsetShadowComponent } from './basic-info-fieldset/basic-info-fieldset-shadow.component';
import { CompanyFieldsetShadowComponent } from './company-fieldset/company-fieldset-shadow.component';
import { AddressFieldsetShadowComponent } from './address-fieldset/address-fieldset-shadow.component';

@Component({
  selector: 'app-user-form-shadow',
  imports: [
    BasicInfoFieldsetShadowComponent,
    CompanyFieldsetShadowComponent,
    AddressFieldsetShadowComponent,
  ],
  templateUrl: './user-form-shadow.component.html',
})
export class UserFormShadowComponent {}
