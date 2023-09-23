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
export class TaskPageComponent implements OnInit {
  allTask$: Observable<Task[]> = this.taskService.getAllUndeletedTasks();
  draggedTask: Task | null | undefined;
  allSprints$: Observable<Sprint[]> = this.sprintService.getAllUndeletedSprints()
  sprintOptions!: any;
  selectedSprint!: any;
  protected readonly Sprint = Sprint;

  constructor(private taskService: TaskService, private sprintService: SprintServiceService) {
    this.sprintService.getAllUndeletedSprints().subscribe(sprints => {
      sprints.forEach(sprint => {
        let sprintOption = {name: sprint.sprintTitle, value: sprint.id};
        this.sprintOptions.push(sprintOption);
      })
    })
  }

  ngOnInit() {

  }

  dragStart(task: Task) {
    this.draggedTask = task;
  }

  dragEnd() {
    this.draggedTask = null;
  }

  drop(sprintId: string) {
    if (this.draggedTask) {


    }
  }
}
