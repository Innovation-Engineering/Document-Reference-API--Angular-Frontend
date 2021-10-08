export interface DirectoryI{
  findAll: string,
  findByDepartment: string,
  findByID: string,
  findCountNoneAssigned: string,
  findCountDepartment: string
}
export interface Embedded {
  _embedded: Array<User>;
}
export interface User {
  id?: string;
  userType?: string;
  reportsTo?: string;
  email?: string;
  details?: Details;
  _links?: Links;
}
export interface Links{
  self: Self;
}
export interface Self {
  href: string;
}

export interface Users extends User {
  userType: string;
  reportsTo: string;
  email: string;
  details: Details;
}
export interface CreateUser extends User{
  userType: string;
  email: string;
  details: Details;
}
export interface EditUser extends User {
  id: string;
  userType: string;
  reportsTo: string;
  email: string;
  details: Details;
}
export interface Details {
  firstName: string;
  lastName: string;
  totalBalance: string;
}
