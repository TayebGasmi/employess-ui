import {Component, Input, OnChanges, SimpleChanges} from '@angular/core';

@Component({
  selector: 'app-stacked-bar-chart',
  templateUrl: './stacked-bar-chart.component.html',
  styleUrls: ['./stacked-bar-chart.component.scss']
})
export class StackedBarChartComponent implements OnChanges{
  @Input() bugfixTodoCount:any;
  @Input() bugfixInProgressCount:any;
  @Input() bugfixDoneCount:any;

  @Input() featureTodoCount:any;
  @Input() featureInProgressCount:any;
  @Input() featureDoneCount:any;


  @Input() documentationTodoCount:any;
  @Input() documentationInProgressCount:any;
  @Input() documentationDoneCount:any;
  data: any;
  options: any;


  ngOnChanges(changes: SimpleChanges): void {
    const documentStyle = getComputedStyle(document.documentElement);
    const textColor = documentStyle.getPropertyValue('--text-color');
    const textColorSecondary = documentStyle.getPropertyValue('--text-color-secondary');
    const surfaceBorder = documentStyle.getPropertyValue('--surface-border');

    this.data = {
      labels: ['Bug Fix', 'Feature', 'Documentation'],
      datasets: [
        {
          type: 'bar',
          label: 'To Do',
          backgroundColor: documentStyle.getPropertyValue('--blue-500'),
          data: [this.bugfixTodoCount,this.featureTodoCount , this.documentationTodoCount]
        },
        {
          type: 'bar',
          label: 'In Progress',
          backgroundColor: documentStyle.getPropertyValue('--green-500'),
          data: [this.bugfixInProgressCount, this.featureInProgressCount, this.documentationInProgressCount]
        },
        {
          type: 'bar',
          label: 'Done',
          backgroundColor: documentStyle.getPropertyValue('--yellow-500'),
          data: [this.bugfixDoneCount, this.featureDoneCount, this.documentationDoneCount]
        }
      ]
    };

    this.options = {
      maintainAspectRatio: false,
      aspectRatio: 0.8,
      plugins: {
        tooltips: {
          mode: 'index',
          intersect: false
        },
        legend: {
          labels: {
            color: textColor
          }
        }
      },
      scales: {
        x: {
          stacked: true,
          ticks: {
            color: textColorSecondary
          },
          grid: {
            color: surfaceBorder,
            drawBorder: false
          }
        },
        y: {
          stacked: true,
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
}
