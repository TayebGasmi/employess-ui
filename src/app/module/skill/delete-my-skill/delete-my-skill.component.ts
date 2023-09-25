import {Component, Input} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {UserSkillService} from "../../../core/service/user-skill.service";

@Component({
  selector: 'app-delete-my-skill',
  templateUrl: './delete-my-skill.component.html',
  styleUrls: ['./delete-my-skill.component.scss']
})
export class DeleteMySkillComponent {
  @Input()
  id = 0;

  constructor(private confirmationService: ConfirmationService, private notificationService: NotificationService, private skillService: UserSkillService) {
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.id)
        this.skillService.deleteSkillFromUser(this.id).subscribe(() => {
          this.notificationService.showInfo('Info', 'Record deleted')
          this.skillService.updateData()
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
