import { Address, Company, Geo, User } from '@models/user';

const isGeo = (geo: any): geo is Geo =>
  typeof geo === 'object' &&
  geo !== null &&
  'lat' in geo &&
  typeof geo.lat === 'string' &&
  'lng' in geo &&
  typeof geo.lng === 'string';

const isAddress = (address: any): address is Address =>
  typeof address === 'object' &&
  address !== null &&
  'street' in address &&
  typeof address.street === 'string' &&
  'suite' in address &&
  typeof address.suite === 'string' &&
  'city' in address &&
  typeof address.city === 'string' &&
  'zipcode' in address &&
  typeof address.zipcode === 'string' &&
  isGeo(address.geo);

const isCompany = (company: any): company is Company =>
  typeof company === 'object' &&
  company !== null &&
  'name' in company &&
  typeof company.name === 'string' &&
  'catchPhrase' in company &&
  typeof company.catchPhrase === 'string' &&
  'bs' in company &&
  typeof company.bs === 'string';

export const isUser = (user: any): user is User =>
  typeof user === 'object' &&
  user !== null &&
  'id' in user &&
  typeof user.id === 'number' &&
  'name' in user &&
  typeof user.name === 'string' &&
  'email' in user &&
  typeof user.email === 'string' &&
  'username' in user &&
  typeof user.username === 'string' &&
  'phone' in user &&
  typeof user.phone === 'string' &&
  'website' in user &&
  typeof user.website === 'string' &&
  isAddress(user.address) &&
  isCompany(user.company);
