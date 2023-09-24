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
      {label: 'Senior', value: 'SENIOR'},
      {label: 'Junior', value: 'JUNIOR'},
      {label: 'Middle', value: 'MIDDLE'},
      {label: 'Trainee', value: 'TRAINEE'},
      {
        label: 'Intern',
        value: 'INTERN'
      }
    ]
  },
{name: 'firstName', type: 'text', label: 'First Name', validators: [Validators.required], placeholder: 'Enter First Name'},
{name: 'lastName', type: 'text', label: 'Last Name', validators: [Validators.required], placeholder: 'Enter Last Name'},
{name: 'email', type: 'email', label: 'Email', validators: [Validators.required,Validators.email], placeholder: 'Enter Email'},
{name: 'enabled', type: 'checkbox', label: 'Enabled',  placeholder: 'Enter Enabled'},

]
