import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-task-pie-chart',
  templateUrl: './task-pie-chart.component.html',
  styleUrls: ['./task-pie-chart.component.scss']
})
export class TaskPieChartComponent implements OnChanges{
  @Input() totalDoneTask:any;
  @Input() totalInProgressTask:any;
  @Input() totalToDoTask:any;
  @Input() totalTestTask:any;
  @Input() totalReviewTask:any;

data:any;
options:any;

  ngOnChanges(changes: SimpleChanges): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');

    this.data = {
      labels: ['To Do','In Progress', 'Review', 'Test','Done'],
      datasets: [
        {
          data: [this.totalToDoTask, this.totalInProgressTask, this.totalReviewTask,this.totalReviewTask,this.totalDoneTask],
          backgroundColor: [documentStyle.getPropertyValue('--blue-500'), documentStyle.getPropertyValue('--yellow-500'), documentStyle.getPropertyValue('--green-500'),documentStyle.getPropertyValue('--red-500'),documentStyle.getPropertyValue('--black-500')],
          hoverBackgroundColor: [documentStyle.getPropertyValue('--blue-400'), documentStyle.getPropertyValue('--yellow-400'), documentStyle.getPropertyValue('--green-400'), documentStyle.getPropertyValue('--red-400'), documentStyle.getPropertyValue('--black-400')]
        }
      ]
    };

    this.options = {
      plugins: {
        legend: {
          labels: {
            usePointStyle: true,
            color: textColor
          }
        }
      }
    };
  }

}
