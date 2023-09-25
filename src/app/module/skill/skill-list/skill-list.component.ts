import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged, map,
  Observable,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {Page} from "../../../core/models/Page";
import {Skill} from "../../../core/models/Skill";
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";
import {FormControl} from "@angular/forms";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {DomainService} from "../../../core/service/domain.service";
import {ActivityService} from "../../../core/service/activity.service";


interface Pagination {
  rows: number;
  page: number;
}

@Component({
  selector: 'app-skill-list',
  templateUrl: './skill-list.component.html',
  styleUrls: ['./skill-list.component.scss']
})
export class SkillListComponent {
  updateSkills$ = this.skillService.updateSkills$;
  skillHeaders: TableColumnHeader[] = [
    {
      dataKey: 'name',
    },
    {
      dataKey: 'description',
    },
    {
      displayName: 'Domain',
      dataKey: 'name',
      object: true,
      objectKey: 'domain'
    },
    {
      displayName: 'Activity',
      dataKey: 'name',
      object: true,
      objectKey: 'activity'
    }
  ];
  pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({rows: 10, page: 0});
  name = new FormControl('');
  search$:Observable<string|null> = this.name.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
  activity = new FormControl();
  domain = new FormControl();
  activity$:Observable<string|null> = this.activity.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
  domain$:Observable<string|null> = this.domain.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
  activities$=this.activityService.getAll()
  domains$=this.domainService.getAll()
  activitiesDomainOption$=combineLatest([
    this.activities$,
    this.domains$
  ]).pipe(
    map(([activities,domains])=>{return ({activities:activities.map(
        activities=>{
          return  {
            label:activities.name, value
              :
            activities.name
          }
        }
      ),domains:domains.map(domain=>{
        return  {
          label:domain.name,
          value
            :
          domain.name
        }
      }
    )})})
  )
  activitiesDomain$=combineLatest([
    this.activities$,
    this.domains$
  ]).pipe(
    map(([activities,domains])=>{return ({activities:activities.map(
        activities=>{
          return  {
            label:activities.name, value
              :
            activities.id
          }
        }
      ),domains:domains.map(domain=>{
        return  {
          label:domain.name,
          value
            :
          domain.id
        }
      })})})
  )
  totalItems$: BehaviorSubject<number> = new BehaviorSubject(100);
  skills$: Observable<Page<Skill>> = combineLatest([
    this.pagination$,
    this.search$,
    this.activity$,
    this.domain$,
    this.updateSkills$,
  ]).pipe(
    switchMap(([pagination, name,activity,domain]) => {
      if (name || activity || domain) {
        return this.skillService.searchSkills(name  ,activity,domain, pagination.page ?? 0, pagination.rows ?? 10);
      }

      return this.skillService.getAllSkills(pagination.page ?? 0, pagination.rows ?? 10);

    }),
    tap((page) => this.totalItems$.next(page.totalElements))
  );
  first: number = 0;
  @ViewChild('table') table: any;
  cols = [
    {field: 'name', header: 'Name'},
    {field: 'description', header: 'Description'},
  ];

  constructor(private notificationService: NotificationService, private skillService: SkillService, private confirmationService: ConfirmationService,private domainService:DomainService,private activityService:ActivityService) {

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pagination$.next({rows: event.rows, page: event.page});
  }

  exportExcel() {
    console.log(this.table);
    this.table.dt.exportCSV();
  }

  deleteAll() {
    this.skillService.deleteSkills(this.table.selectedRow).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully", "Delete")
      this.skillService.updateSkills();
    });
  }

  delete(rowData: any): void  {
    this.skillService.deleteSkillById(rowData.id).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully", "Delete")
      this.skillService.updateSkills();
    });
  }

  confirm() {
    this.confirmationService.confirm({
      message: 'Do you want to delete this record?',
      header: 'Delete Confirmation',
      icon: 'pi pi-info-circle',
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


}
