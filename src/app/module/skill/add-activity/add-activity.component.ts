import {Component, ViewChild} from '@angular/core';
import {AddFormComponent} from "../add-form/add-form.component";
import {Activity} from "../../../core/models/Activity";
import {ActivityForm} from "../../../core/models/ActivityForm";
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";
import {ActivityService} from "../../../core/service/activity.service";


@Component({
  selector: 'app-add-activity',
  templateUrl: './add-activity.component.html',
  styleUrls: ['./add-activity.component.scss']
})
export class AddActivityComponent {

  protected readonly ActivityForm = ActivityForm;
  constructor(private notificationService: NotificationService, private activityService: ActivityService) {
  }

  @ViewChild(FormComponent) form?: FormComponent;
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
      this.activityService.save(this.form?.form.value).pipe(
          tap((activity) => {
                this.notificationService.showSuccess('Skill added successfully', 'Success');
                this.closeModal();
                this.activityService.updateData(activity)
              }
          )
      )
          .subscribe()
    }
  }
}
