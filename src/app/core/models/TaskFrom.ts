import {FormField} from "./FormField";
import {Validators} from "@angular/forms";
import {TaskType} from "./task-type.enum";

export const TaskFrom: FormField[] = [{
  name: 'taskTitle',
  type: 'text',
  label: 'Task Title',
  validators: [Validators.required],
  placeholder: 'Enter Task Title'
},
  {
    name: 'taskDescription',
    type: 'textarea',
    label: 'Task Description',
    validators: [Validators.required],
    placeholder: 'Enter Task Description'
  },
  {
    name: 'taskType',
    type: 'dropdown',
    options: [{label: TaskType.FEATURE, value: TaskType.FEATURE}, {
      label: TaskType.BUGFIX,
      value: TaskType.BUGFIX
    }, {label: TaskType.DOCUMENTATION, value: TaskType.DOCUMENTATION}],
    label: 'Task Type',
    validators: [Validators.required],
    placeholder: 'Enter Task Type'
  },
  {
    name: 'taskEstimation',
    type: 'number',
    label: 'Task Estimation',
    validators: [Validators.required],
    placeholder: 'Enter Task Estimation'
  },
  {
    name: 'taskTime',
    type: 'number',
    label: 'Task Time',
    validators: [Validators.required],
    placeholder: 'Enter Task Time'
  }]
