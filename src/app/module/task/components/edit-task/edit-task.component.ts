import {Component, Input, ViewChild} from '@angular/core';
import {FormComponent} from "../../../shared/form/form.component";
import {NotificationService} from "../../../shared/notification.service";
import {TaskService} from "../../../../core/service/TaskService";
import {Task} from "../../../../core/models/Task";
import {TaskFrom} from "../../../../core/models/TaskFrom";

@Component({
  selector: 'app-edit-task',
  templateUrl: './edit-task.component.html',
  styleUrls: ['./edit-task.component.scss']
})
export class EditTaskComponent {
  @Input()
  task?: Task;
  @ViewChild(FormComponent) form?: FormComponent;
  constructor(private  notificationService: NotificationService, private taskService: TaskService) {
  }
  protected readonly TaskForm = TaskFrom;
  showModal= false;
openModal(){
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
    this.taskService.updateTask(this.form?.form.value,this.task?.id ).subscribe((skill) => {
      this.notificationService.showSuccess('Task updated successfully', 'Success');
      this.closeModal();

    })
  }
  openModel() {
    this.showModal = true;
  }
}
