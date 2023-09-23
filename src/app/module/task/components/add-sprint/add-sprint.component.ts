import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../../shared/notification.service";
import {FormComponent} from "../../../shared/form/form.component";
import {FormField} from "../../../../core/models/FormField";
import {tap} from "rxjs";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";
import {SprintForm} from "../../../../core/models/SprintForm";

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.scss']
})
export class AddSprintComponent {
  @ViewChild(FormComponent) form?: FormComponent;
  showModal = false;
  protected readonly sprintForm: FormField[] = SprintForm;

  constructor(private notificationService: NotificationService, private sprintService: SprintServiceService) {
  }

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }

  save() {
    console.log(this.form?.form.value)
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    if (this.form?.form.valid) {
      this.sprintService.saveSprint(this.form?.form.value).pipe(
        tap((skill) => {
            this.notificationService.showSuccess('Sprint added successfully', 'Success');
            this.closeModal();

          }
        )
      )
        .subscribe()
    }
  }
}
