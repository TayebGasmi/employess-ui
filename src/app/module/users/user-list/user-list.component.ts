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
import {Skill} from "../../../core/models/Skill";
import {NotificationService} from "../../shared/notification.service";
import {ConfirmationService, ConfirmEventType} from "primeng/api";
import {UserService} from "../../../core/service/user.service";
import {User} from "../../../core/models/user";
import {JobService} from "../../../core/service/job.service";
interface Pagination {
  rows: number;
  page: number;
}
@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {

  userHeaders: TableColumnHeader[] = [
    {
      dataKey: 'firstName',
    },
    {
      dataKey: 'lastName',
    }
    ,{
      dataKey: 'email',
    },
    {
      dataKey:'job',
      displayName: 'Job',
      object: true,
      objectKey: 'attributes'

    },
    {
      dataKey: 'grade',
      displayName: 'Grade',
      object: true,
      objectKey: 'attributes'
    },
    {
      dataKey: 'gender',
      displayName:'Gender',
      object: true,
      objectKey: 'attributes'
    },
     {
      dataKey: 'birthdate',
      displayName:'Birthdate',
      object: true,
      objectKey: 'attributes'
    },
    {
      dataKey: 'phone',
      displayName:'Phone',
      object: true,
      objectKey: 'attributes'
    }
  ];
  pagination$: BehaviorSubject<Pagination> = new BehaviorSubject<Pagination>({rows: 10, page: 0});
  name = new FormControl('');
  search$ = this.name.valueChanges.pipe(
    debounceTime(300),
    distinctUntilChanged(),
    startWith(''),
  );
  totalItems$: BehaviorSubject<number> = new BehaviorSubject(100);
  users$: Observable<User[]> = combineLatest([
    this.pagination$,
    this.search$,
    this.userService.data$,
  ]).pipe(
    switchMap(([pagination, name]) => {
      if (name) {
        return this.userService.getAll( pagination.page ?? 0, pagination.rows ?? 10, name);
      }

      return this.userService.getAll(pagination.page ?? 0, pagination.rows ?? 10);

    }),
    //tap((page) => this.totalItems$.next(page.totalElements))
  );
  first: number = 0;
  @ViewChild('table') table: any;
  cols = [
    {field: 'firstName', header: 'First Name'},
    {field: 'lastName', header: 'Last Name'},
    {field: 'email', header: 'Email'},
    {field: 'enabled', header: 'Enabled'},
    {field: 'emailVerified', header: 'Email Verified'},
    {field: 'createdTimestamp', header: 'Created Timestamp'},
    {field: 'gender',header: 'Gender'},
    {field: 'birthdate',header: 'Birthdate'},

  ];

  constructor(private notificationService: NotificationService, private userService: UserService, private confirmationService: ConfirmationService,private jobService:JobService) {

  }

  onPageChange(event: any) {
    this.first = event.first;
    this.pagination$.next({rows: event.rows, page: event.page});
  }

  exportExcel() {
    console.log(this.table);
    this.table.dt.exportCSV();
  }


  delete(rowData: any): void  {
    this.userService.delete(rowData.id).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully", "Delete")
      this.userService.updateData();
    });
  }
  jobs$=this.jobService.getAll()

}
