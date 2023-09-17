import {Component, ViewChild} from '@angular/core';
import {SkillForm} from "../../../core/models/SkillForm";
import {FormComponent} from "../../shared/form/form.component";
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {tap} from "rxjs";

@Component({
  selector: 'app-add-skill',
  templateUrl: './add-skill.component.html',
  styleUrls: ['./add-skill.component.scss']
})
export class AddSkillComponent {
  constructor(private notificationService: NotificationService, private skillService: SkillService) {
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
      this.skillService.addSkill(this.form?.form.value).pipe(
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
}
