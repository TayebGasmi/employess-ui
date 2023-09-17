import {Component, Input, ViewChild} from '@angular/core';
import {QuizForm} from "../../../core/models/QuizForm";
import {NotificationService} from "../../shared/notification.service";
import {FormComponent} from "../../shared/form/form.component";
import {tap} from "rxjs";
import {QuizService} from "../../../core/service/quiz.service";

@Component({
  selector: 'app-add-quiz',
  templateUrl: './add-quiz.component.html',
  styleUrls: ['./add-quiz.component.scss']
})
export class AddQuizComponent {

  protected readonly QuizForm = QuizForm;

  constructor(private notificationService: NotificationService, private quizService: QuizService) {
  }

  @Input() skillId = 0;
  @ViewChild(FormComponent) form?: FormComponent;
  showModal = false;

  openModal() {
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
    if (this.form?.form.valid) {
      this.quizService.addQuizToSkill(this.form?.form.value, this.skillId).pipe(
        tap((quiz) => {
            this.quizService.updateQuizzes(quiz);
            this.closeModal();
            this.notificationService.showSuccess(
              `Skill ${quiz.name} added successfully`,
              'Success')
          }
        )
      )
        .subscribe()
    }
  }
}
