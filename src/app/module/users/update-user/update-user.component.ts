import {Component, Input, ViewChild} from '@angular/core';
import {UserForm} from "../../../core/models/UserForm";
import {UserService} from "../../../core/service/user.service";
import {NotificationService} from "../../shared/notification.service";
import {Skill} from "../../../core/models/Skill";
import {FormComponent} from "../../shared/form/form.component";
import {SkillService} from "../../../core/service/skill.service";
import {User} from "../../../core/models/user";

@Component({
  selector: 'app-update-user',
  templateUrl: './update-user.component.html',
  styleUrls: ['./update-user.component.scss']
})
export class UpdateUserComponent {

  protected readonly UserForm = UserForm;
  constructor(private userService: UserService,private notificationService: NotificationService) {
  }
  @Input()
  user?: User
  @ViewChild(FormComponent) form?: FormComponent;
  showModal = false;

  closeModal() {
    this.showModal = false;
  }

  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    this.userService.update(this.user?.id || "", this.form?.form.value).subscribe((skill) => {
      this.notificationService.showSuccess('Skill updated successfully', 'Success');
      this.closeModal();
      this.userService.updateData()
    })
  }

  openModal() {
    this.showModal = true;
  }
}
