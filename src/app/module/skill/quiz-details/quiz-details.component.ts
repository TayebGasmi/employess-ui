import { Component } from '@angular/core';
import {map, Observable, switchMap} from "rxjs";
import {Quiz} from "../../../core/models/quiz";
import {ActivatedRoute} from "@angular/router";
import {QuizService} from "../../../core/service/quiz.service";
import {QuestionService} from "../../../core/service/question.service";

@Component({
  selector: 'app-quiz-details',
  templateUrl: './quiz-details.component.html',
  styleUrls: ['./quiz-details.component.scss']
})
export class QuizDetailsComponent {
  quizId$: Observable<number> = this.route.params.pipe((params) => params.pipe(map((param) => param["id"])));
  Quiz$: Observable<Quiz> = this.quizId$.pipe(switchMap((id) => this.quizService.getQuizById(id)));

  constructor(private route: ActivatedRoute, private quizService: QuizService, private questionService: QuestionService) {

  }
}
