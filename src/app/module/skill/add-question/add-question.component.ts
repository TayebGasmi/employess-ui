import {Component, Input, ViewChild} from '@angular/core';
import {BehaviorSubject, catchError, map, of, switchMap, tap} from "rxjs";
import {Question} from "../../../core/models/question";
import {FormArray, FormBuilder, FormGroup, Validators} from "@angular/forms";
import {NotificationService} from "../../shared/notification.service";
import {QuestionService} from "../../../core/service/question.service";
import {ActivatedRoute} from "@angular/router";
import {MenuItem} from "primeng/api";
import {Menu} from "primeng/menu";

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.scss']
})
export class AddQuestionComponent {
  isSubmitted = false;
  @Input()
  updateQuestions$?: BehaviorSubject<Question | null>
  questionForm: FormGroup = this.fb.group({
    questionDto: this.fb.group({
      questionText: ['', [Validators.required]],
      responseDescription: ['', [Validators.required]],
    }),
    options: this.fb.array([])
  });
  quizId$ = this.route.params.pipe(map(params => params["id"]));
  show = false

  constructor(private notificationService: NotificationService, private fb: FormBuilder, private questionService: QuestionService,
              private route: ActivatedRoute) {
  }

  get optionsArray() {
    return this.questionForm.get('options') as FormArray;
  }

  addOption($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation()
    this.optionsArray.push(this.fb.group({
      optionText: ['', [Validators.required]],
      correct: [false, [Validators.required]],
    }));
  }

  removeOption(index: number) {
    this.optionsArray.removeAt(index);
  }

  submit() {
    this.isSubmitted = true;
    if (this.questionForm.invalid) {
      return;
    }
    this.quizId$.pipe(
      switchMap(quizId => this.questionService.addQuestionToQuizWithOptions(this.questionForm.value, quizId))
      , tap(
        question => {
          this.updateQuestions$?.next(question)
          this.notificationService.showSuccess("Question added successfully", "Success");
          this.resetForm();
          this.alterShow()
        }
      ),
      catchError(
        (err) => {
          this.notificationService.showError(err?.error?.message && err?.error?.subErrors[0]?.message, "Error");
          return of(null);
        }
      )
    ).subscribe()
  }
  @ViewChild('menu', { static: false }) menu!: Menu;
  items: MenuItem[]=[
    { label: 'delete', icon: 'pi pi-fw pi-trash', command: () => {
        this.removeOption(this.selectedIndex);
      } },
    // Add more menu items as needed
  ];
  selectedIndex: number=0;
  toggleMenu(event: Event, index: number) {
    this.selectedIndex = index;
    this.menu.toggle(event);
  }
  showFieldErrors(controlName: string): boolean | undefined {
    const questionDto = this.questionForm.get('questionDto') as FormGroup;
    const control = questionDto.get(controlName);
    return control?.invalid && (control?.dirty || control?.touched || this.isSubmitted);
  }

  showOptionErrors(controlName: string, index: number): boolean | undefined {
    const control = this.optionsArray.controls[index].get(controlName);
    return control?.invalid && (control?.dirty || control?.touched || this.isSubmitted)
  }

  clearOptions() {
    this.optionsArray.clear();
  }

  resetForm() {
    this.questionForm.reset();
    this.clearOptions()
  }

  alterShow() {
    this.questionForm.reset();
    this.show = !this.show
  }
}
