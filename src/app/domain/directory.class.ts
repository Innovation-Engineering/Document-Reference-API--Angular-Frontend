import {DirectoryI} from "./reference-api.interface";

export class Directory implements DirectoryI {
  findAll:string = 'http://localhost:8080/api/users';  //+ID
  createUser:string = 'http://localhost:8080/api/users/new/user/create'; //+ID
  editUser:string ='http://localhost:8080/api/users';
  appointUser:string = 'http://localhost:8080/api/users'///user/patch?leaderId=
  findTotalUsers:string = 'http://localhost:8080/api/users/any/user/total'
  findByID:string = 'http://localhost:8080/api/users'; //+ID
  findByDepartmentT:string = 'http://localhost:8080/api/users/search/findByUserType';
  findByDepartment:string = 'http://localhost:8080/api/users/search/findByUserType?type='; //+Department
  findCountNoneAssigned:string = 'http://localhost:8080/api/users/search/countUsersByReportsToIsContaining?leaderId=none%20assigned';
  findCountDepartment:string = 'http://localhost:8080/api/users/search/countByUserType?department=';//+Department
  constructor() {

  }
  accessAPI(url:string, param?:string){
    return (!param) ? url : url + param;
  }
}
