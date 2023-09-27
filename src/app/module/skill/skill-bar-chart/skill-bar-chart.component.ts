import {AfterViewInit, Component, Input} from '@angular/core';

@Component({
  selector: 'app-skill-bar-chart',
  templateUrl: './skill-bar-chart.component.html',
  styleUrls: ['./skill-bar-chart.component.scss']
})
export class SkillBarChartComponent implements AfterViewInit {
  @Input() data:any []=[];
  basicData: any;

  basicOptions: any;
  ngAfterViewInit(): void {
    this.basicData = {
      labels: [this.data[0]?.userName, this.data[1]?.userName, this.data[2]?.userName ],
      datasets: [

        {
          label: 'Users Skills ',
          backgroundColor: '#FFA726',
          data: [this.data[0]?.skillsCount, this.data[1]?.skillsCount, this.data[2]?.skillsCount]
        }
      ]
    };

  }
}
