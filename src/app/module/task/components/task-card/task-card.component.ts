import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Task} from "../../../../core/models/Task";
import {TaskService} from "../../../../core/service/TaskService";
import {tap} from "rxjs";
import {NotificationService} from "../../../shared/notification.service";

@Component({
  selector: 'app-task-card',
  templateUrl: './task-card.component.html',
  styleUrls: ['./task-card.component.scss']
})
export class TaskCardComponent {
  @Input() task!:Task;
  @Output() taskEditEventEmitter:EventEmitter<Task> = new EventEmitter<Task>()
  emitToTaskPage(task:Task){
    console.log('gogogog')
this.taskEditEventEmitter.emit(task)
  }
  constructor(private taskService:TaskService,private notificationService:NotificationService) {

  }
  deleteTask(id:string){
    this.taskService.deleteTask(id).pipe(
      tap((task) => {
          this.notificationService.showSuccess('Task Deleted successfully', 'Success');
          this.taskService.updateData();
        }
      )
    )
      .subscribe()
  }
  duplicateTask(id:string){
    this.taskService.duplicateTask(id).pipe(
      tap((task:Task)=>{
      this.notificationService.showSuccess('Task Duplicated successfully', 'Success');
    }))

      .subscribe();
}
}
