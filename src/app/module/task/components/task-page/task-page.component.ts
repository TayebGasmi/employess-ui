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
export class TaskPageComponent implements OnInit{


  protected readonly TaskStatus = TaskStatus;



  allTask$:Observable<Task[]> = this.taskService.data$.pipe(switchMap(data=>this.taskService.getAllUndeletedTasks())) ;
     draggedTask : Task | null | undefined;
     allSprints$:Observable<Sprint[]> = this.sprintService.getAllUndeletedSprints()
     selectedSprint:FormControl<Sprint | null >= new FormControl(null,Validators.required);
     selectedSprint$ = this.selectedSprint.valueChanges.pipe(
       startWith(null),
       debounceTime(300),
    distinctUntilChanged(),
     );
     /*sprintTasks$=this.selectedSprint$.pipe(
       filter(sprint=> sprint!=""),
       switchMap((sprint)=>this.taskService.selectTasksPerSprint(sprint||""||null))
       )*/

  constructor(private taskService :TaskService,private sprintService:SprintServiceService,private notificationService:NotificationService) {

  }

  ngOnInit() {

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
         this.notificationService.showSuccess('Task '+this.draggedTask?.taskTitle+' affected to Sprint '+this.selectedSprint.value?.sprintTitle,'success');
      })
     ).subscribe();
  }

    }
  }
  sprintTask$:Observable<Task[]>=this.selectedSprint$.pipe(
    switchMap(sprint=>this.taskService.selectTasksPerSprint(sprint?.id || "ff"))
  )
  data$:Observable<Task[]> = combineLatest([this.taskService.data$ , this.sprintTask$]).pipe(map(
    ([_,tasks])=> tasks
  ))
  dropInsideSprint(status:TaskStatus){
 if(this.draggedTask !== null &&  this.draggedTask !== undefined ){
   if(this.selectedSprint.valid){
     // @ts-ignore
     this.taskService.updateTaskStatus(this.selectedSprint.value?.id,status).subscribe( task =>{
       this.taskService.updateData();
     })
   }
 }
  }

  updateSprintTasks(){
    if(this.selectedSprint !== null && this.selectedSprint.valid && this.selectedSprint !== undefined ){




    }
  }


}
