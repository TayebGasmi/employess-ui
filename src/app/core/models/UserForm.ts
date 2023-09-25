import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const UserForm: FormField[] = [
  {
    name: 'grade',
    type: 'dropdown',
    label: 'Grade',
    validators: [Validators.required],
    placeholder: 'Enter Grade',
    options: [
      {label: 'Senior', value: 'Senior'},
      {label: 'Junior', value: 'Junior'},
      {label: 'Middle', value: 'Middle'},
      {label: 'Trainee', value: 'Trainee'},
      {
        label: 'Intern',
        value: 'Intern'
      }
    ]
  },
{name: 'firstName', type: 'text', label: 'First Name', validators: [Validators.required], placeholder: 'Enter First Name'},
{name: 'lastName', type: 'text', label: 'Last Name', validators: [Validators.required], placeholder: 'Enter Last Name'},
  {name:'birthdate',type:'date',label:'Birthdate',validators:[Validators.required],placeholder:'Enter Birthdate'},
{name: 'email', type: 'email', label: 'Email', validators: [Validators.required,Validators.email], placeholder: 'Enter Email'},



  {name:"gender",type:"dropdown",label:"select your gender",placeholder:"enter gender",validators:[Validators.required],options:[
      {label: "male",value: "male"},
      {label: "female",value: "female"},
      {label: "other",value: "other"}
    ]},
  {name:"phone",type:"text",label:"Phone",placeholder:"enter phone",validators:[Validators.required]},
  {name: 'enabled', type: 'checkbox', label: 'Enabled',  placeholder: 'Enter Enabled'},

]
