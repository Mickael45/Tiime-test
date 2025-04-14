import { Address, Company, Geo, User } from '@models/user';

const isGeo = (geo: any): geo is Geo =>
  typeof geo === 'object' &&
  geo !== null &&
  typeof geo.lat === 'string' &&
  typeof geo.lng === 'string';

const isAddress = (address: any): address is Address =>
  typeof address === 'object' &&
  address !== null &&
  typeof address.street === 'string' &&
  typeof address.suite === 'string' &&
  typeof address.city === 'string' &&
  typeof address.zipcode === 'string' &&
  isGeo(address.geo);

const isCompany = (company: any): company is Company =>
  typeof company === 'object' &&
  company !== null &&
  typeof company.name === 'string' &&
  typeof company.catchPhrase === 'string' &&
  typeof company.bs === 'string';

export const isUser = (user: any): user is User =>
  typeof user === 'object' &&
  user !== null &&
  typeof user.id === 'number' &&
  typeof user.name === 'string' &&
  typeof user.email === 'string' &&
  typeof user.username === 'string' &&
  typeof user.phone === 'string' &&
  typeof user.website === 'string' &&
  isAddress(user.address) &&
  isCompany(user.company);
