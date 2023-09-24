import {Component, Input} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {UserService} from "../../../core/service/user.service";

@Component({
  selector: 'app-delete-user',
  templateUrl: './delete-user.component.html',
  styleUrls: ['./delete-user.component.scss']
})
export class DeleteUserComponent {
  @Input()
  id = ""

  constructor(private confirmationService: ConfirmationService, private notificationService: NotificationService, private userService: UserService) {
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.id)
        this.userService.delete(this.id).subscribe(() => {
          this.notificationService.showInfo('Info', 'Record deleted')
          this.userService.updateData()
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
