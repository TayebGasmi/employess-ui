import {Component, ViewChild} from '@angular/core';
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  Observable,
  startWith,
  switchMap, tap
} from "rxjs";
import {FormControl} from "@angular/forms";
import {Page} from "../../../core/models/Page";
import {Activity} from "../../../core/models/Activity";
import {NotificationService} from "../../shared/notification.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {JobForm} from "../../../core/models/jobForm";
import {JobService} from "../../../core/service/job.service";
interface Pagination {
  rows: number;
  page: number;
}
@Component({
  selector: 'app-job-list',
  templateUrl: './job-list.component.html',
  styleUrls: ['./job-list.component.scss']
})
export class JobListComponent {
  updateData$ = this.service.data$;
  skillHeaders: TableColumnHeader[] = [
    {
      dataKey: 'name',
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

  constructor(private notificationService: NotificationService, private service: JobService, private confirmationService: ConfirmationService,public jobService: JobService) {

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
    console.log(this.table.selectedRow);
    this.service.deleteAll(this.table.selectedRow).subscribe(value => {

      this.notificationService.showInfo("Deleted successfully", "Delete")
      this.service.updateData()
    });
  }

  delete(rowData: any): void  {
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

  protected readonly JobForm = JobForm;
}
