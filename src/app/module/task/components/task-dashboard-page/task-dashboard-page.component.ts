import {Component, OnDestroy, OnInit} from '@angular/core';
import {MenuItem} from "primeng/api";
import {Task} from "../../../../core/models/Task";
import {Subscription} from "rxjs";
import {TaskService} from "../../../../core/service/TaskService";
import {LayoutService} from "../../../../layout/service/app.layout.service";
import {GraphQlService} from "../../../../core/service/graph-ql.service";

@Component({
  selector: 'app-task-dashboard-page',
  templateUrl: './task-dashboard-page.component.html',
  styleUrls: ['./task-dashboard-page.component.scss']
})
export class TaskDashboardPageComponent  implements OnInit, OnDestroy {
  totalTaskCount?:number;

  items!: MenuItem[];

  products!: Task[];

  chartData: any;

  chartOptions: any;

  subscription!: Subscription;

  constructor(private productService: TaskService, public layoutService: LayoutService , private graphQlService:GraphQlService) {
    this.subscription = this.layoutService.configUpdate$.subscribe(() => {
      this.initChart();
    });
  }

  ngOnInit() {
    this.graphQlService.subscribe(`subscription MySubscription {
  task_aggregate {
    aggregate {
      count
    }
  }
}`).subscribe((result:any) => console.log(result.data.task_aggregate.aggregate.count));
    this.initChart();

    this.items = [
      { label: 'Add New', icon: 'pi pi-fw pi-plus' },
      { label: 'Remove', icon: 'pi pi-fw pi-minus' }
    ];
  }

  initChart() {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.chartData = {
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'First Dataset',
          data: [65, 59, 80, 81, 56, 55, 40],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--bluegray-700'),
          borderColor: documentStyle.getPropertyValue('--bluegray-700'),
          tension: .4
        },
        {
          label: 'Second Dataset',
          data: [28, 48, 40, 19, 86, 27, 90],
          fill: false,
          backgroundColor: documentStyle.getPropertyValue('--green-600'),
          borderColor: documentStyle.getPropertyValue('--green-600'),
          tension: .4
        }
      ]
    };

    this.chartOptions = {
      plugins: {
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        }
      }
    };
  }

  ngOnDestroy() {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }
}
