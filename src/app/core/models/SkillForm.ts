import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const SkillForm: FormField[] = [
    {name: 'name', type: 'text', label: 'Name', validators: [Validators.required], placeholder: 'Enter Skill Name'},
    {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        validators: [Validators.required],
        placeholder: 'Enter Skill Description'
    },
]
