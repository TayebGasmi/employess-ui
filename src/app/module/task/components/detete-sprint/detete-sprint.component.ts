import {Component, Input} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {NotificationService} from "../../../shared/notification.service";
import {SkillService} from "../../../../core/service/skill.service";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";

@Component({
  selector: 'app-detete-sprint',
  templateUrl: './detete-sprint.component.html',
  styleUrls: ['./detete-sprint.component.scss']
})
export class DeteteSprintComponent {
  constructor(private confirmationService: ConfirmationService, private notificationService: NotificationService,private sprintService:SprintServiceService) {
  }
  @Input()
  id='';
  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.id)
        this.sprintService.deleteSprint(this.id).subscribe(()=>{
          this.notificationService.showInfo('Info', 'Record deleted')
          this.sprintService.updateData();
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
