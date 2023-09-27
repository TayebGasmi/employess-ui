import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../../shared/notification.service";
import {TaskService} from "../../../../core/service/TaskService";
import {FormComponent} from "../../../shared/form/form.component";
import {FormField} from "../../../../core/models/FormField";
import {TaskFrom} from "../../../../core/models/TaskFrom";
import {tap} from "rxjs";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";
import {SprintForm} from "../../../../core/models/SprintForm";

@Component({
  selector: 'app-add-sprint',
  templateUrl: './add-sprint.component.html',
  styleUrls: ['./add-sprint.component.scss']
})
export class AddSprintComponent {
  constructor(private notificationService: NotificationService, private sprintService: SprintServiceService) {
  }

  @ViewChild(FormComponent) form?: FormComponent;

  protected readonly sprintForm : FormField[] = SprintForm;


  showModal = false;

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
            this.sprintService.updateData();
            this.closeModal();

          }
        )
      )
        .subscribe()
    }
  }
}
