import {Component, OnInit} from '@angular/core';
import {LayoutService} from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

  model: any[] = [];

  constructor(public layoutService: LayoutService) {
  }

  ngOnInit() {
    this.model = [
      {
        label: 'home',
        items: [
          {label: 'Home', icon: 'pi pi-home', routerLink: ['/']},
        ]
      },
      {
        label: 'users',
        items: [
          {label: 'Users', icon: 'pi pi-fw pi-users', routerLink: ['/user']},
        ]
      },
      {
        label: 'formation',
        items: [
          {label: 'Formation', icon: 'pi pi-fw pi-book', routerLink: ['/formation']},
        ]
      },
      {
        label: 'task',
        items: [
          {label: 'Task', icon: 'pi pi-fw pi-check', routerLink: ['/task']},
        ]
      }
      ,
      {
        label: 'performance',
        items: [
          {label: 'Skills', icon: 'pi pi-fw pi-star', routerLink: ['/skill']},
          {
            label: 'Activity', icon: 'pi pi-fw pi-calendar-plus', routerLink: ['skill/activity']
          },
          {
            label: 'Domain', icon: 'pi pi-fw pi-globe', routerLink: ['skill/domain']
          }
        ]

      }
,
      {
        label: 'job',
        items: [
          {label: 'Job', icon: 'pi pi-fw pi-briefcase', routerLink: ['/job']},
        ]
      },
      {
        label: 'dashboard',
        items: [
          {label: 'Dashboard', icon: 'pi pi-fw pi-chart-bar', routerLink: ['/dashboard']},
        ]
      }


    ];
  }
}
