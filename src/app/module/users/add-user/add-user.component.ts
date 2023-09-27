import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {UserService} from "../../../core/service/user.service";
import {User} from "../../../core/models/user";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";
import {UserForm} from "../../../core/models/UserForm";
import {FormField} from "../../../core/models/FormField";
import {Validators} from "@angular/forms";
import {Job} from "../../../core/models/job";

@Component({
  selector: 'app-add-user',
  templateUrl: './add-user.component.html',
  styleUrls: ['./add-user.component.scss']
})
export class AddUserComponent implements OnInit{
  ngOnInit(): void {
    let jobField:FormField={
      label:"Job",
      placeholder:"choose Job",
      validators:[Validators.required],
      type:"dropdown",
      options:this.jobs.map((job)=>{return {label:job.name,value:job.name}}),
      name:"job"
    }
    this.fields=[jobField,...this.userForm,]
  }
    constructor(private notificationService: NotificationService,private userService:UserService) {
    }
  @ViewChild(FormComponent) form?: FormComponent;
  protected readonly userForm = UserForm
  showModal = false;
  @Input(

  )
  jobs:Job[]=[]
  fields:FormField[]=[]
  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {

    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    if (this.form?.form.valid) {
      const {firstName,lastName,email,job,grade,enabled
      ,birthdate,gender,phone
      }=this.form?.form.value
      const user={
        firstName,
        lastName,
        email,
        enabled,

      }
      const year = birthdate.getFullYear();
      const month = String(birthdate.getMonth() + 1).padStart(2, '0'); // Month is zero-based, so add 1
      const day = String(birthdate.getDate()).padStart(2, '0');

      const dateString = `${year}-${month}-${day}`;
      this.userService.add({
        ...user,
        "emailVerified": false  ,
        "credentials": [
          {
            "type": "password",
            "value": "12345",
            "temporary": true // Set to false to indicate it's not a temporary password
          }
        ],
        attributes:{
          job,
          grade,
          birthdate:dateString,
          gender,
          phone
        }
      }).pipe(
        tap((skill) => {
           console.log(skill)
            this.notificationService.showSuccess('user added successfully', 'Success');
            this.closeModal();
            this.userService.updateData()
          }
        )
      )
        .subscribe()
    }
  }

}
