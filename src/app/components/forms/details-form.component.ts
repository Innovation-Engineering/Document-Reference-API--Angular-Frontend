import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {SectorsInterface} from "../../domain/business-selector-interface";
import {CreateUser, Details, EditUser, User} from "../../domain/reference-api.interface";
import {UserService} from "../../services/user.service";
import {FormNotificationComponent} from "./shard/form-notification.component";
import {MatSnackBar} from "@angular/material/snack-bar";
import {ActivatedRoute} from "@angular/router";
import {map} from "rxjs/operators";
import {Observable} from "rxjs";

/**
 * @title Inputs in a form
 */

@Component({
  selector: 'details-form',
  templateUrl: 'details-form.component.html',
  styleUrls: ['details-form.component.css'],
})
export class DetailsFormComponent implements OnInit {
  @Input() operation = '';
  users: User[] = [];
  userForm = this.builder.group({
    id: [''],
    firstName: [''],
    lastName: [''],
    userType: ['', Validators.required],
    email:[''],
    reportsTo: [''],
    totalBalance: [''],
    userIdForm: this.builder.group({
      supId: [''],
      subId: ['']
    })
  });
  ngOnInit() {
  }

  constructor(public activatedRoute: ActivatedRoute, private builder: FormBuilder, private userService:UserService, private _snackBar: MatSnackBar) { }

  onSubmit() {
    let user = this.getFormData()
    switch (this.operation){
      case 'create':
        this.createUser(user);
        break;
      case 'edit':
        this.editUser(user);
        break;
      case 'delete':
        let id = (this.userForm.get("userIdForm.supId")?.value);
        console.log(id);
        this.deleteUser(id);
        break;
      case 'appoint':
        let supId = (this.userForm.get("userIdForm.supId")?.value);
        let subId = (this.userForm.get("userIdForm.subId")?.value);
        this.patchUser(supId, subId);
        break;
    }
  }

  getFormData():User {
    let d: Details = {
      firstName: (this.userForm.get("firstName")?.value).trim(),
      lastName: (this.userForm.get("lastName")?.value).trim(),
      totalBalance: (this.userForm.get("totalBalance")?.value).trim()
    }
    return {
      id: (this.userForm.get("id")?.value),
      userType: (this.userForm.get("userType")?.value),
      email: (this.userForm.get("email")?.value).trim(),
      details: d
    };
  }
  createUser(user: User): void {
    if (!user.email) {
      return;
    }
    this.userService
      .createUser(user)
      .subscribe(user =>{
          this.users.push(user);
          console.log(this.userForm.value);
          this.openSnackBar();
        }
      );
  }
  editUser(user: User): void {
    if (!user.email || !user.id) {
      return;
    }
    this.userService
      .editUser(user)
      .subscribe(user =>{
          console.log(this.userForm.value);
          this.openSnackBar();
        }
      );
  }
  deleteUser(id:string){
    this.userService
      .deleteUser(id)
      .subscribe(user =>{
          console.log(this.userForm.get(""));
          this.openSnackBar();
        }
      );
  }
  patchUser(supId:string, subId:string){
    this.userService
      .patchUser(supId, subId)
      .subscribe(user =>{
          this.openSnackBar();
        }
      );
  }
  openSnackBar() {
    this._snackBar.openFromComponent(FormNotificationComponent, {
      duration: 4 * 1000
    });
  }
  emailElement = new FormControl('', [
    // Validators.required,
    // Validators.email,
  ]);
  // matcher = new EmailMatcher();

  sectors: SectorsInterface[] = [
    {value: 'Business Development', viewValue: 'Business Development'},
    {value: 'Marketing', viewValue: 'Marketing'},
    {value: 'Sales', viewValue: 'Sales'}
  ];
}
