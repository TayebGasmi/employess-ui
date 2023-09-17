import {Component, Input} from '@angular/core';
import {Question} from "../../../core/models/question";
import {BehaviorSubject} from "rxjs";

@Component({
  selector: 'app-question',
  templateUrl: './question.component.html',
  styleUrls: ['./question.component.scss']
})
export class QuestionComponent {
  @Input() question?: Question;
  @Input() index = 0;
  @Input() updateQuestions$?: BehaviorSubject<Question | null>;

}
