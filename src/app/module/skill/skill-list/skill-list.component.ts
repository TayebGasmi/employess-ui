import {Component, ViewChild} from '@angular/core';
import {NotificationService} from "../../shared/notification.service";
import {SkillService} from "../../../core/service/skill.service";
import {
  BehaviorSubject,
  combineLatest,
  debounceTime,
  distinctUntilChanged, last,
  map,
  Observable,
  startWith,
  switchMap, tap
} from "rxjs";
import {Page} from "../../../core/models/Page";
import {Skill} from "../../../core/models/Skill";
import {TableColumnHeader} from "../../../core/models/tableColumnHeader";
import {FormControl} from "@angular/forms";
import {ConfirmationService, ConfirmEventType} from "primeng/api";


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
constructor(private notificationService: NotificationService,private skillService: SkillService,private confirmationService: ConfirmationService) {

}
  updateSkills$ = this.skillService.updateSkills$;
  paginationDefaults = {
    currentSize: 5,
    currentPage: 1,
    sizeOptions: [1, 5, 10, 25],
    maxSize: 10,
  };
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
  skills$: Observable<Page<Skill>> = combineLatest([
    this.pagination$,
    this.search$,
    this.updateSkills$,
  ]).pipe(
    switchMap(([pagination, name]) => {
        if(name)
        {
          return this.skillService.searchSkills(name, pagination.page ?? 0, pagination.rows ?? 10);
        }

        return this.skillService.getAllSkills(pagination.page ?? 0, pagination.rows ?? 10);

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
    this.skillService.deleteSkills(this.table.selectedRow).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully","Delete")
      this.skillService.updateSkills();
  });}

  delete(rowData: any):void|undefined {
    this.skillService.deleteSkillById(rowData.id).subscribe(value => {
      this.notificationService.showInfo("Deleted successfully","Delete")
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
