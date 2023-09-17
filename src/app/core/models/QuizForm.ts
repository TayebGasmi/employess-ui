import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const QuizForm: FormField[] = [
    {name: 'name', type: 'text', label: 'Name', validators: [Validators.required], placeholder: 'Enter quiz Name'},
    {
        name: 'description',
        type: 'textarea',
        label: 'Description',
        validators: [Validators.required],
        placeholder: 'Enter quiz Description'
    },
]
