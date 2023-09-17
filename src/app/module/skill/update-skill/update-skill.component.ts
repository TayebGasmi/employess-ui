import {Component, Input, ViewChild} from '@angular/core';
import {SkillForm} from "../../../core/models/SkillForm";
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {Skill} from "../../../core/models/Skill";
import {FormComponent} from "../../shared/form/form.component";

@Component({
  selector: 'app-update-skill',
  templateUrl: './update-skill.component.html',
  styleUrls: ['./update-skill.component.scss']
})
export class UpdateSkillComponent {
  @Input()
  skill?: Skill
  @ViewChild(FormComponent) form?: FormComponent;
  constructor(private  notificationService: NotificationService, private skillService: SkillService) {
  }
  protected readonly SkillForm = SkillForm;
  showModal= false;

  closeModal() {
    this.showModal = false;
  }
  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    this.skillService.updateSkillById(this.skill?.id||0, this.form?.form.value).subscribe((skill) => {
      this.notificationService.showSuccess('Skill updated successfully', 'Success');
      this.closeModal();
      this.skillService.updateSkills(skill)
    })
    }
  openModal() {
    this.showModal = true;
  }
}


