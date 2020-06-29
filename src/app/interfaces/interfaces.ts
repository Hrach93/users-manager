export interface Geo {
  lat: string;
  lng: string;
}

export interface Address {
  geo: Geo;
  city: string;
  street: string;
  suite: string;
  zipcode: string;
}

export interface Company {
  bs: string;
  catchPhrase: string;
  name: string;
}

export interface User {
  id: number;
  email: string;
  address: Address;
  company: Company;
  name: string;
  phone: string;
  username: string;
  website: string;
}
