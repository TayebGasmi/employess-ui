import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {TaskRoutingModule} from "./task-routing.module";
import { TaskPageComponent } from './components/task-page/task-page.component';
import {TableModule} from "primeng/table";
import {DragDropModule} from "primeng/dragdrop";
import {TagModule} from "primeng/tag";
import { TaskCardComponent } from './components/task-card/task-card.component';
import {ToolbarModule} from "primeng/toolbar";
import {FileUploadModule} from "primeng/fileupload";
import { AddTaskComponent } from './components/add-task/add-task.component';
import {DialogModule} from "primeng/dialog";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "../shared/shared.module";
import { EditTaskComponent } from './components/edit-task/edit-task.component';
import { AddSprintComponent } from './components/add-sprint/add-sprint.component';
import {DropdownModule} from "primeng/dropdown";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";



@NgModule({
  declarations: [
    TaskPageComponent,
    TaskCardComponent,
    AddTaskComponent,
    EditTaskComponent,
    AddSprintComponent
  ],
  imports: [
    CommonModule,
    TaskRoutingModule,
    TableModule,
    DragDropModule,
    TagModule,
    ToolbarModule,
    FileUploadModule,
    DialogModule,
    RippleModule,
    SharedModule,
    DropdownModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class TaskModule { }
