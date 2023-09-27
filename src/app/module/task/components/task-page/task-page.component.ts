import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {TaskService} from "../../../../core/service/TaskService";
import {Task} from "../../../../core/models/Task";
import {combineLatest, debounceTime, distinctUntilChanged, map, Observable, startWith, switchMap, tap} from "rxjs";
import {Sprint} from "../../../../core/models/Sprint";
import {SprintServiceService} from "../../../../core/service/sprint-service.service";
import {BaseService} from "../../../../core/service/BaseService";
import {NotificationService} from "../../../shared/notification.service";
import {FormControl, Validators} from "@angular/forms";
import {filter} from "rxjs/operators";
import {TaskStatus} from "../../../../core/models/task-status.enum";

@Component({
  selector: 'app-task-page',
  templateUrl: './task-page.component.html',
  styleUrls: ['./task-page.component.scss']
})
export class TaskPageComponent {


  protected readonly TaskStatus = TaskStatus;



  allTask$:Observable<Task[]> =this.taskService.data$.pipe(
    switchMap(_=> this.taskService.getAllUndeletedTasks() )
  )
     draggedTask : Task | null | undefined;
     allSprints$:Observable<Sprint[]> = this.sprintService.getAllUndeletedSprints()
     selectedSprint:FormControl<Sprint | null >= new FormControl(null,Validators.required);
     selectedSprint$ = this.selectedSprint.valueChanges.pipe(
       debounceTime(300),
    distinctUntilChanged(),
     );


  constructor(private taskService :TaskService,private sprintService:SprintServiceService,private notificationService:NotificationService) {

  }




  dragStart(task: Task) {
    this.draggedTask = task;
  }
  dragEnd() {
    //this.draggedTask = null;
  }
  drop() {
     if (this.draggedTask) {
   if(!this.selectedSprint.valid){
     this.notificationService.showError('Sprint Not Selected','error')
   }else{
     // @ts-ignore
     this.taskService.affectTaskToSprint(this.draggedTask.id,this.selectedSprint.value?.id).pipe(
       tap(task=>{
         this.taskService.updateData()
         this.notificationService.showSuccess('Task '+this.draggedTask?.taskTitle+' affected to Sprint '+this.selectedSprint.value?.sprintTitle,'success');
      })
     ).subscribe();
  }

    }
  }
  data$:Observable<{ todo:Task[]
  ,done:Task[],
    test:Task[],
    review:Task[],
    inProgress:Task[],
    waiting:Task[],

  }>=combineLatest(
    [this.selectedSprint$,this.taskService.data$]
  ).pipe(
    tap(([sprint,_])=> {
      console.log("sprint")
      console.log(sprint)
    }),
    switchMap(([sprint,_])=> {
      return  this.taskService.data$.pipe(
        switchMap(
          _=>this.taskService.selectTasksPerSprint(sprint?.id || "ff")
        ),
        map(tasks=>(
          {
           todo:tasks.filter(task=>task.taskStatus==TaskStatus.TODO),
            done:tasks.filter(task=>task.taskStatus==TaskStatus.DONE),
            review:tasks.filter(task=>task.taskStatus==TaskStatus.UNDER_REVIEW),
            test:tasks.filter(task=>task.taskStatus==TaskStatus.TEST),
            inProgress:tasks.filter(task=>task.taskStatus==TaskStatus.IN_PROGRESS),
            waiting:tasks.filter(task=>task.taskStatus==TaskStatus.WAITING),


          }
        ))
      )
    })
    ,tap(task=> {
      console.log("tasks")
      console.log(task)
    })

  )




}
