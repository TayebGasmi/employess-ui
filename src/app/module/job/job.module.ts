import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { JobRoutingModule } from './job-routing.module';
import { JobListComponent } from './job-list/job-list.component';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "../shared/shared.module";
import {ToolbarModule} from "primeng/toolbar";
import { DeleteJobComponent } from './delete-job/delete-job.component';


@NgModule({
  declarations: [
    JobListComponent,
    DeleteJobComponent
  ],
  imports: [
    CommonModule,
    JobRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    SharedModule,
    ToolbarModule
  ]
})
export class JobModule { }
