export type Geo = {
  lat: string;
  lng: string;
};

export type Address = {
  street: string;
  suite: string;
  city: string;
  zipcode: string;
  geo: Geo;
};

export type Company = {
  name: string;
  catchPhrase: string;
  bs: string;
};

export type User = {
  id: number;
  name: string;
  email: string;
  username: string;
  phone: string;
  website: string;
  address: Address;
  company: Company;
};

export type UnIdedUser = Omit<User, 'id'>;
