import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {UserForm} from "../../../core/models/UserForm";
import {UserService} from "../../../core/service/user.service";
import {NotificationService} from "../../shared/notification.service";
import {Skill} from "../../../core/models/Skill";
import {FormComponent} from "../../shared/form/form.component";
import {SkillService} from "../../../core/service/skill.service";
import {User} from "../../../core/models/user";
import {FormField} from "../../../core/models/FormField";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent implements OnInit {
  fields:FormField[]=[]
  data:any={}
  protected readonly UserForm = UserForm;
  constructor(private userService: UserService,private notificationService: NotificationService) {
  }
  @Input()
  user?: User
  @ViewChild(FormComponent) form?: FormComponent;
  showModal = false;
  @Input()
  jobs!:any[]
  closeModal() {
    this.showModal = false;
  }
  ngOnInit(): void {
    let jobField:FormField={
      label:"Job",
      placeholder:"choose Job",
      validators:[Validators.required],
      type:"dropdown",
      options:this.jobs.map((job)=>{return {label:job.name,value:job.name}}),
      name:"job"
    }
    this.fields=[jobField,...this.UserForm]
    this.data={
      ...this.user,
      grade: this.user?.attributes["grade"],
      job: this.user?.attributes["job"],
      birthdate: new Date(this.user?.attributes["birthdate"]as string),
      gender:this.user?.attributes["gender"]
    }
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
      this.userService.update(this.user?.id || "", {
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
    }
      ).subscribe((user) => {
        this.notificationService.showSuccess('Skill updated successfully', 'Success');
        this.closeModal();
        this.userService.updateData()
      }
      )

  }
  }

  openModal() {
    this.showModal = true;
  }
}
