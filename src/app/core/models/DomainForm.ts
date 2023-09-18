import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const DomainForm:FormField[] = [
    {
        type: 'text',name: 'name',label: 'Name',placeholder: 'Enter Name' ,validators: [Validators.required]
    }
]
