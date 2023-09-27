import {Component, Input} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {NotificationService} from "../../../shared/notification.service";
import {SkillService} from "../../../../core/service/skill.service";
import {TaskService} from "../../../../core/service/TaskService";

@Component({
  selector: 'app-detete-task',
  templateUrl: './detete-task.component.html',
  styleUrls: ['./detete-task.component.scss']
})
export class DeteteTaskComponent {
  constructor(private confirmationService: ConfirmationService, private notificationService: NotificationService,private taskService:TaskService) {
  }
  @Input()
  id='';
  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this Task?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.id)
        this.taskService.deleteTask(this.id).subscribe(()=>{
          this.notificationService.showInfo('Info', 'Task deleted')
          this.taskService.updateData();
        })
      },
      reject: (type: ConfirmEventType) => {
        switch (type) {
          case ConfirmEventType.REJECT:
            this.notificationService.showError('Rejected', 'You have rejected');
            break;
          case ConfirmEventType.CANCEL:
            this.notificationService.showWarn('Cancelled', 'You have cancelled');
            break;
        }
      }
    });
  }
}
