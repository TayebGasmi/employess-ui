import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {FormControl} from "@angular/forms";
import {Page} from "../../../core/models/Page";
import {Skill} from "../../../core/models/Skill";
import {QuizService} from "../../../core/service/quiz.service";
import {ActivatedRoute} from "@angular/router";
import {Domain} from "../../../core/models/Domain";
import {DomainForm} from "../../../core/models/DomainForm";
import {DomainService} from "../../../core/service/domain.service";

interface Pagination {
  rows: number;
  page: number;
}
@Component({
  selector: 'app-quiz-list',
  templateUrl: './quiz-list.component.html',
  styleUrls: ['./quiz-list.component.scss']
})

export class QuizListComponent {
  domainType:Domain={
    name:'k'
  }
  constructor(private notificationService: NotificationService,private quizService: QuizService,private confirmationService: ConfirmationService,private route: ActivatedRoute,public domainService:DomainService) {

  }
  updateQuizzes$ = this.quizService.updateQuizzes$;
  skillId$:Observable<number> = this.route.params.pipe(
    map(params => params["id"])
  )
  skillHeaders: TableColumnHeader[] = [
    {
      dataKey: 'name',
    },
    {
      dataKey: 'description',
    },
  ];
  pagination$:BehaviorSubject<Pagination>=new BehaviorSubject<Pagination>({rows:10,page:0});
  name = new FormControl('');
  search$ = this.name.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
  totalItems$: BehaviorSubject<number> = new BehaviorSubject(100);
  quizzes$: Observable<Page<Skill>> = combineLatest([
    this.pagination$,
    this.search$,
    this.updateQuizzes$,
    this.skillId$
  ]).pipe(
    switchMap(([pagination, name,_,id]) => {
      if (name) {
        return this.quizService.getQuizBySkillIdAndName(id,name, pagination.page ?? 0, pagination.rows ?? 10);
      }
      return this.quizService.getQuizzesBySkill(id,pagination.page ?? 0, pagination.rows ?? 10);

    }),
    tap((page) => this.totalItems$.next(page.totalElements))
  );

  first: number = 0;


  onPageChange(event: any) {
    this.first = event.first ;
    this.pagination$.next({rows:event.rows,page:event.page});
  }
  @ViewChild('table') table: any;
  exportExcel() {
    console.log(this.table);
    this.table.dt.exportCSV();
  }
  cols=[
    { field: 'name', header: 'Name' },
    { field: 'description', header: 'Description' },
  ];

  deleteAll() {
    this.quizService.deleteAllQuizzes(this.table.selectedRow).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully","Delete")
      this.quizService.updateQuizzes()
    });}

  delete(rowData: any):void|undefined {
    this.quizService.deleteQuizById(rowData.id).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully","Delete")
      this.quizService.updateQuizzes()
    });
  }

  confirm($event:MouseEvent) {
    $event .stopPropagation()
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
      key: 'deleteAll',
      accept: () => {
        this.deleteAll();
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


  protected readonly DomainForm = DomainForm;
}
