import {Component, Input} from '@angular/core';
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {NotificationService} from "../../shared/notification.service";
import {QuizService} from "../../../core/service/quiz.service";

@Component({
  selector: 'app-delete-quiz',
  templateUrl: './delete-quiz.component.html',
  styleUrls: ['./delete-quiz.component.scss']
})
export class DeleteQuizComponent {
  @Input() quizId = 0;
  @Input()
  id = 0;

  constructor(private confirmationService: ConfirmationService, private notificationService: NotificationService, private quizService: QuizService) {
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      accept: () => {
        console.log(this.id)
        this.quizService.deleteQuizById(this.id).subscribe(() => {
          this.notificationService.showInfo('Info', 'Record deleted')
          this.quizService.updateQuizzes()
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
