import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {combineLatest, map, tap} from "rxjs";
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {FormComponent} from "../../shared/form/form.component";
import {SkillForm} from "../../../core/models/SkillForm";
import {DomainService} from "../../../core/service/domain.service";
import {ActivityService} from "../../../core/service/activity.service";
import {FormField} from "../../../core/models/FormField";
import {Validators} from "@angular/forms";

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent implements OnInit{
  ngOnInit(): void {
    this.fields=this.getFormFields(this.activitiesDomains)
  }
  constructor(private notificationService: NotificationService, private skillService: SkillService,private domainService:DomainService,private activityService:ActivityService) {
  }
  @ViewChild(FormComponent) form?: FormComponent;
  protected readonly SkillForm = SkillForm;
  showModal = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    if (this.form?.form.valid) {
      console.log(this.form.form.value)
      this.skillService.addWithDomainAndActivity(this.form?.form.value,this.form?.form.value["domain"],this.form?.form.value["activity"]).pipe(
        tap((skill) => {
            this.notificationService.showSuccess('Skill added successfully', 'Success');
            this.closeModal();
            this.skillService.updateSkills(skill)
          }
        )
      )
        .subscribe()
    }
  }

  getFormFields(activitiesDomain:any):FormField[]{
   let domainField:FormField={
    label:"domain",
     placeholder:"chooseDomain",
     validators:[Validators.required],
     type:"dropdown",
     options:activitiesDomain.domains,
     name:"domain"
   }
   let activityField:FormField={
     label:"activity",
      placeholder:"choose activity",
      validators:[Validators.required],
      type:"dropdown",
      options:activitiesDomain.activities,
      name:"activity"
  }
    return [domainField,activityField,...this.SkillForm,]
  }
  @Input(
  )
  activitiesDomains!:any
  fields:FormField[]=[]


}
