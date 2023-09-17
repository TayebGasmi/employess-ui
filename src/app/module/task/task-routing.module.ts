import { NgModule } from '@angular/core';

import {RouterModule, Routes} from "@angular/router";
import {TaskPageComponent} from "./components/task-page/task-page.component";


const routes: Routes = [

  {
    path: "",
    children: [
      {
        path: "",
        component: TaskPageComponent,
        pathMatch: "full"
      }

    ],


  },


];

@NgModule({
  declarations: [],
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TaskRoutingModule { }
