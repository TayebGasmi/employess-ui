import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {SkillListComponent} from "./skill-list/skill-list.component";
import {QuizListComponent} from "./quiz-list/quiz-list.component";

const routes: Routes = [

  {
    path: "",
    children: [
      {
        path: "",
        component: SkillListComponent,
        pathMatch: "full"
      },
      {
        path: "quiz/:id",
        component: QuizListComponent,
      }

    ],


  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule { }
