import {AsyncValidatorFn, ValidatorFn} from "@angular/forms";

export interface FormField {
    type: formType;
    label: string;
    placeholder?: string;
    name: string;
    validators?: ValidatorFn[];
    asyncValidators?: AsyncValidatorFn[];
    options?: { label: string, value: string }[];
    multiple?: boolean;
}

type formType = 'text' | 'email' | 'password' | 'number' | 'date' | 'select' | 'checkbox' | 'radio' | 'textarea' | 'file' |'dropdown'
