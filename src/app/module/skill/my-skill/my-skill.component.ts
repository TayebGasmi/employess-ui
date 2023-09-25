import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";
import {BehaviorSubject, combineLatest, Observable, switchMap, tap} from "rxjs";
import {Page} from "../../../core/models/Page";
import {Skill} from "../../../core/models/Skill";
import {SkillService} from "../../../core/service/skill.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {DomainService} from "../../../core/service/domain.service";
import {ActivityService} from "../../../core/service/activity.service";
import {UserSkillService} from "../../../core/service/user-skill.service";

interface Pagination {
  rows: number;
  page: number;
}
@Component({
  selector: 'app-my-skill',
  templateUrl: './my-skill.component.html',
  styleUrls: ['./my-skill.component.scss']
})
export class MySkillComponent {

  updateSkills$ = this.skillService.data$;
  skillHeaders: TableColumnHeader[] = [
    {
      dataKey:'skillLevel',
      displayName:'Skill Level'
    },
    {
      dataKey:'name',
      displayName:'Skill Name',
      object: true,
      objectKey: 'skill'
    },
    {
      dataKey:'description',
      displayName:'Skill Description',
      object: true,
      objectKey: 'skill'

    }

  ];
  pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({rows: 10, page: 0});
  totalItems$: BehaviorSubject<number> = new BehaviorSubject(100);
  skills$: Observable<Page<any>> = combineLatest([
    this.pagination$,
    this.updateSkills$,
  ]).pipe(
    switchMap(([pagination,_]) => {
      return this.skillService.getSkillByUser();
    }),
    tap((page) => this.totalItems$.next(page.totalElements))
  );
  first: number = 0;
  @ViewChild('table') table: any;
  cols = [
    {field: 'name', header: 'Name'},
    {field: 'description', header: 'Description'},
  ];

  constructor(private notificationService: NotificationService, private skillService: UserSkillService, private confirmationService: ConfirmationService,private domainService:DomainService,private activityService:ActivityService) {

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pagination$.next({rows: event.rows, page: event.page});
  }

  exportExcel() {
    console.log(this.table);
    this.table.dt.exportCSV();
  }





}
