import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const JobForm: FormField[] = [
{name: 'name', type: 'text', label: 'Name', validators: [Validators.required], placeholder: 'Enter Name'},
]
