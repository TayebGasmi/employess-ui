import {Component, Input, ViewChild} from '@angular/core';
import {UserSkillFrom} from "../../../core/models/UseSkillForm";
import {NotificationService} from "../../shared/notification.service";
import {UserSkillService} from "../../../core/service/user-skill.service";
import {DomainService} from "../../../core/service/domain.service";
import {ActivityService} from "../../../core/service/activity.service";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";

@Component({
  selector: 'app-update-my-skill',
  templateUrl: './update-my-skill.component.html',
  styleUrls: ['./update-my-skill.component.scss']
})
export class UpdateMySkillComponent {

  constructor(private notificationService: NotificationService, private skillService: UserSkillService,private domainService:DomainService,private activityService:ActivityService) {
  }
  @ViewChild(FormComponent) form?: FormComponent;
  @Input()
  skillLevel!: any;
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
