import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap,
  tap
} from "rxjs";
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";
import {FormControl} from "@angular/forms";
import {Page} from "../../../core/models/Page";
import {Activity} from "../../../core/models/Activity";
import {ActivityService} from "../../../core/service/activity.service";
import {ActivityForm} from "../../../core/models/ActivityForm";

interface Pagination {
  rows: number;
  page: number;
}

@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent {
  updateData$ = this.service.data$;
  skillHeaders: TableColumnHeader[] = [
    {
      dataKey: 'name',
    },
    {
      dataKey: 'description',
    },
  ];
  pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({rows: 10, page: 0});
  name = new FormControl('');
  search$ = this.name.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
  totalItems$: BehaviorSubject<number> = new BehaviorSubject(100);
  data$: Observable<Page<Activity>> = combineLatest([
    this.pagination$,
    this.search$,
    this.updateData$,
  ]).pipe(
    switchMap(([pagination, name, _]) => {
      if (name)
        return this.service.findByName(name, pagination.page ?? 0, pagination.rows ?? 10);
      return this.service.findAll(pagination.page ?? 0, pagination.rows ?? 10);

    }),
    tap((page) => this.totalItems$.next(page.totalElements))
  );
  first: number = 0;
  @ViewChild('table') table: any;
  cols = [
    {field: 'name', header: 'Name'},
    {field: 'description', header: 'Description'},
  ];

  constructor(private notificationService: NotificationService, private service: ActivityService, private confirmationService: ConfirmationService,public activityService: ActivityService) {

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
    this.service.deleteAll(this.table.selectedRow).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully", "Delete")
      this.service.updateData()
    });
  }

  delete(rowData: any): void | undefined {
    this.service.deleteById(rowData.id).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully", "Delete")
      this.service.updateData()
    });
  }

  confirm($event: MouseEvent) {
    $event.stopPropagation()
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

  protected readonly ActivityForm = ActivityForm;
}
