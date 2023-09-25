import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SkillListComponent} from "./skill-list/skill-list.component";
import {QuizListComponent} from "./quiz-list/quiz-list.component";
import {QuizQuestionComponent} from "./quiz-question/quiz-question.component";
import {QuizResponseComponent} from "./quiz-response/quiz-response.component";
import {QuizDetailsComponent} from "./quiz-details/quiz-details.component";
import {ActivityListComponent} from "./activity-list/activity-list.component";
import {DomainListComponent} from "./domain-list/domain-list.component";
import {AuthGuard} from "../../guard/auth.guard";
import {MySkillComponent} from "./my-skill/my-skill.component";

const routes: Routes = [

  {
    path: "",
    children: [
      {
        path: "",
        component: SkillListComponent,
        pathMatch: "full",
      },
      {
        path: "quiz/:id",
        component: QuizListComponent,
        canActivate: [AuthGuard],

      },
      {
        path: "quiz/detail/:id",
        component: QuizDetailsComponent,
      },
      {
        path: "quiz/question/:id",
        component: QuizQuestionComponent,
      },
      {
        path: 'quiz/response/:id',
        component: QuizResponseComponent
      }
      ,
      {
        path: 'activity',
        component: ActivityListComponent
      }
      ,
      {
        path: 'domain',
        component: DomainListComponent
      }
      ,{
      path: 'my',
        component:MySkillComponent
      }
    ],


  },


];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SkillRoutingModule {
}
