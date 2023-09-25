import {FormField} from "./FormField";
import {Validators} from "@angular/forms";

export const UserSkillFrom: FormField[] = [
  {
    label: "skill Level",
    placeholder: "choose skill level",
    validators: [Validators.required],
    type: "dropdown",
    options: [
      { label: "BEGINNER", value: "BEGINNER" },
      { label: "INTERMEDIATE", value: "INTERMEDIATE" },
      { label: "EXPERT", value: "EXPERT" },
      { label: "ADVANCED", value: "ADVANCED" }
    ]
   ,
    name: "skillLevel"
  }]
