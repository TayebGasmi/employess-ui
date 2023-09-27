import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../../shared/notification.service";
import {FormComponent} from "../../../shared/form/form.component";
import {tap} from "rxjs";
import {TaskService} from "../../../../core/service/TaskService";
import {FormField} from "../../../../core/models/FormField";
import {TaskFrom} from "../../../../core/models/TaskFrom";

@Component({
  selector: 'app-add-task',
  templateUrl: './add-task.component.html',
  styleUrls: ['./add-task.component.scss']
})
export class AddTaskComponent {
  @ViewChild(FormComponent) form?: FormComponent;
  showModal = false;
  protected readonly taskForm: FormField[] = TaskFrom;

  constructor(private notificationService: NotificationService, private taskService: TaskService) {
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
      this.taskService.saveTask(this.form?.form.value).pipe(
        tap((task) => {
            this.notificationService.showSuccess('Task added successfully', 'Success');
            this.closeModal();
            this.taskService.updateData();

          }
        )
      )
        .subscribe()
    }
  }
}
