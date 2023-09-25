import {Component, Input} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {NotificationService} from "../../shared/notification.service";
import {ActivityService} from "../../../core/service/activity.service";
import {JobService} from "../../../core/service/job.service";

@Component({
  selector: 'app-delete-job',
  templateUrl: './delete-job.component.html',
  styleUrls: ['./delete-job.component.scss']
})
export class DeleteJobComponent {
  @Input()
  id = 0;

  constructor(private confirmationService: ConfirmationService, private notificationService: NotificationService, private service: JobService) {
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.id)
        this.service.deleteById(this.id).subscribe(() => {
          this.notificationService.showInfo('Info', 'Record deleted')
          this.service.updateData()
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
