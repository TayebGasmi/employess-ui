import {Component, OnInit} from '@angular/core';
import {TaskService} from "../../../../core/service/TaskService";
import {Task} from "../../../../core/models/Task";
import {debounceTime, distinctUntilChanged, Observable, startWith, switchMap, tap} from "rxjs";
import {Sprint} from "../../../../core/models/Sprint";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";
import {BaseService} from "../../../../core/service/BaseService";
import {NotificationService} from "../../../shared/notification.service";
import {FormControl} from "@angular/forms";
import {filter} from "rxjs/operators";


@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent implements OnInit{
     allTask$:Observable<Task[]> = this.taskService.data$.pipe(switchMap(data=>this.taskService.getAllUndeletedTasks())) ;
     draggedTask : Task | null | undefined;
     allSprints$:Observable<Sprint[]> = this.sprintService.getAllUndeletedSprints()
     selectedSprint= new FormControl('');
     selectedSprint$ = this.selectedSprint.valueChanges.pipe(
       startWith(''),
       debounceTime(300),
    distinctUntilChanged(),
     );
     sprintTasks$=this.selectedSprint$.pipe(
       filter(sprint=> sprint!=""),
       switchMap((sprint)=>this.taskService.selectTasksPerSprint(sprint||""))
       )

  constructor(private taskService :TaskService,private sprintService:SprintServiceService,private notificationService:NotificationService) {

  }

  ngOnInit() {

  }


  dragStart(task: Task) {
    this.draggedTask = task;
    console.log(task)
  }
  dragEnd() {
    this.draggedTask = null;
  }
  drop() {
  //   if (this.draggedTask) {
  // if(this.selectedSprint.id === undefined){
  //   this.notificationService.showError('Sprint Not Selected','error')
  // }else{
  //   this.taskService.affectTaskToSprint(this.draggedTask.id,this.selectedSprint.id).pipe(
  //     tap(task=>{
  //       this.notificationService.showSuccess('Task '+this.draggedTask?.taskTitle+' affected to Sprint '+this.selectedSprint.sprintTitle,'success');
  //     })
  //   ).subscribe();
  // }
  //
  //   }
  }

}
