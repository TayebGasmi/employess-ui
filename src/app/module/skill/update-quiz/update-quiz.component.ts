import {Component, Input, ViewChild} from '@angular/core';
import {Quiz} from "../../../core/models/quiz";
import {QuizForm} from "../../../core/models/QuizForm";
import {NotificationService} from "../../shared/notification.service";
import {QuizService} from "../../../core/service/quiz.service";
import {FormComponent} from "../../shared/form/form.component";

@Component({
  selector: 'app-update-quiz',
  templateUrl: './update-quiz.component.html',
  styleUrls: ['./update-quiz.component.scss']
})
export class UpdateQuizComponent {
  @Input() quiz?: Quiz;
  @ViewChild(FormComponent) form?: FormComponent;
  protected readonly QuizForm = QuizForm;
  showModal= false;
  constructor(private quizService: QuizService,
              private notificationService: NotificationService) {
  }

  closeModal() {
    this.showModal = false;
  }
  save() {
    if (this.form?.form.invalid) {
      this.notificationService.showError('Form is invalid', 'Error');
      return;
    }
    this.quizService.updateQuizById(this.quiz?.id||0, this.form?.form.value).subscribe((skill) => {
      this.notificationService.showSuccess('Skill updated successfully', 'Success');
      this.closeModal();
      this.quizService.updateQuizzes(skill)
    })
  }
  openModal() {
    this.showModal = true;
  }
}
