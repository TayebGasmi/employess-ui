import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../../core/service/TaskService";
import {Task} from "../../../../core/models/Task";
import {Observable} from "rxjs";
import {Sprint} from "../../../../core/models/Sprint";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit{
    allTask$:Observable<Task[]> = this.taskService.getAllUndeletedTasks();
     draggedTask : Task | null | undefined;
     allSprints$:Observable<Sprint[]> = this.sprintService.getAllUndeletedSprints()
       sprintOptions!:any;
     selectedSprint:Sprint = new Sprint();
     mySprints:any[] = [];
  constructor(private taskService :TaskService,private sprintService:SprintServiceService) {

  }

  ngOnInit() {

  }


  dragStart(task: Task) {
    this.draggedTask = task;
  }
  dragEnd() {
    this.draggedTask = null;
  }
  drop(sprintId:string) {
    if (this.draggedTask) {


    }
  }

}
