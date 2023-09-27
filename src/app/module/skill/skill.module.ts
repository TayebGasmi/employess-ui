import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SkillRoutingModule} from './skill-routing.module';
import {SkillListComponent} from './skill-list/skill-list.component';
import {SharedModule} from "../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {DialogModule} from "primeng/dialog";
import {UpdateSkillComponent} from './update-skill/update-skill.component';
import {DeleteSkillComponent} from './delete-skill/delete-skill.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {QuizListComponent} from "./quiz-list/quiz-list.component";
import {DeleteQuizComponent} from './delete-quiz/delete-quiz.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import {UpdateQuizComponent} from './update-quiz/update-quiz.component';
import {QuizDetailsComponent} from './quiz-details/quiz-details.component';
import {QuizQuestionComponent} from './quiz-question/quiz-question.component';
import {QuizResponseComponent} from './quiz-response/quiz-response.component';
import {CardModule} from "primeng/card";
import {DividerModule} from "primeng/divider";
import {CheckboxModule} from "primeng/checkbox";
import {InputTextareaModule} from "primeng/inputtextarea";
import {MenuModule} from "primeng/menu";
import {ToggleButtonModule} from "primeng/togglebutton";
import {FileUploadModule} from "primeng/fileupload";
import {QuestionComponent} from './question/question.component';
import {DomainListComponent} from './domain-list/domain-list.component';
import {ActivityListComponent} from './activity-list/activity-list.component';
import {UpdateActivityComponent} from './update-activity/update-activity.component';
import {UpdateDomainComponent} from './update-domain/update-domain.component';
import {DeleteActivityComponent} from './delete-activity/delete-activity.component';
import {DeleteDomainComponent} from './delete-domain/delete-domain.component';
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { AddQuestionComponent } from './add-question/add-question.component';
import { AddSkillComponent } from './add-skill/add-skill.component';
import { AssignSkillComponent } from './assign-skill/assign-skill.component';
import { MySkillComponent } from './my-skill/my-skill.component';
import { UpdateMySkillComponent } from './update-my-skill/update-my-skill.component';
import { DeleteMySkillComponent } from './delete-my-skill/delete-my-skill.component';
import { SkillDashComponent } from './skill-dash/skill-dash.component';
import { SkillBarChartComponent } from './skill-bar-chart/skill-bar-chart.component';
import {ChartModule} from "primeng/chart";


@NgModule({
  declarations: [
    SkillListComponent,
    UpdateSkillComponent,
    DeleteSkillComponent,
    QuizListComponent,
    DeleteQuizComponent,
    UpdateQuizComponent,
    QuizDetailsComponent,
    QuizQuestionComponent,
    QuizResponseComponent,
    QuestionComponent,
    DomainListComponent,
    ActivityListComponent,
    UpdateActivityComponent,
    UpdateDomainComponent,
    DeleteActivityComponent,
    DeleteDomainComponent,
    AddQuizComponent,
    AddQuestionComponent,
    AddSkillComponent,
    AssignSkillComponent,
    MySkillComponent,
    UpdateMySkillComponent,
    DeleteMySkillComponent,
    SkillDashComponent,
    SkillBarChartComponent
  ],
  imports: [
    CommonModule,
    SkillRoutingModule,
    SharedModule,
    PaginatorModule,
    ToolbarModule,
    ButtonModule,
    RippleModule,
    DialogModule,
    ConfirmDialogModule,
    InputTextModule, ReactiveFormsModule, CardModule, DividerModule, CheckboxModule, InputTextareaModule, MenuModule, ToggleButtonModule, FileUploadModule, ChartModule
  ]
})
export class SkillModule {
}
