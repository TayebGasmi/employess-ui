import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const SprintForm :FormField[] = [{name: 'sprintTitle', type: 'text', label: 'Sprint Title', validators: [Validators.required], placeholder: 'Enter Sprint Title'},
  {name: 'sprintDescription', type: 'text', label: 'Sprint Description', validators: [Validators.required], placeholder: 'Enter Sprint Description'},
  {name:'startDate',type:'date',label:'Sprint Start Date',validators: [Validators.required], placeholder: 'Enter Sprint Start Date'   },
  {name:'EndDate',type:'date',label:'Sprint End Date',validators: [Validators.required], placeholder: 'Enter Sprint End Date'   }

]

