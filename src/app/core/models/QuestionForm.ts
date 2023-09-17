import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const QuestionForm: FormField[] = [
    {
        name: 'questionText',
        type: 'text',
        label: 'Question Text',
        validators: [Validators.required],
        placeholder: 'Enter Question Text'
    },
    {
        name: 'responseDescription',
        type: 'textarea',
        label: 'Response Description',
        validators: [Validators.required],
        placeholder: 'Enter Response Description'
    }
]
