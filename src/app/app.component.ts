import {Component, OnInit} from '@angular/core';
import {NotificationService} from "./module/shared/notification.service";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent  implements  OnInit{
  constructor(private notificationService: NotificationService) {
  }
  ngOnInit(): void {
    this.notificationService.showSuccess('Success', 'Success');

  }
}
