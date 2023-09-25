import {Component, Input, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {DomainService} from "../../../core/service/domain.service";
import {ActivityService} from "../../../core/service/activity.service";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";
import {FormField} from "../../../core/models/FormField";
import {Validators} from "@angular/forms";
import {UserSkillFrom} from "../../../core/models/UseSkillForm";
import {UserSkillService} from "../../../core/service/user-skill.service";

@Component({
  selector: 'app-assign-skill',
  templateUrl: './assign-skill.component.html',
  styleUrls: ['./assign-skill.component.scss']
})
export class AssignSkillComponent {
  constructor(private notificationService: NotificationService, private skillService: UserSkillService,private domainService:DomainService,private activityService:ActivityService) {
  }
  @ViewChild(FormComponent) form?: FormComponent;

  showModal = false;
  @Input()
  SkillId: number = 0;
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
      this.skillService.addSkillToUser(this.SkillId,this.form.form.value["skillLevel"]).pipe(
        tap((skill) => {
            this.notificationService.showSuccess('Skill added successfully', 'Success');
            this.closeModal();

          }
        )
      )
        .subscribe()
    }
  }


  protected readonly UserSkillFrom = UserSkillFrom;
}
