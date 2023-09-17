import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SkillRoutingModule} from './skill-routing.module';
import {SkillListComponent} from './skill-list/skill-list.component';
import {SharedModule} from "../shared/shared.module";
import {PaginatorModule} from "primeng/paginator";
import {ToolbarModule} from "primeng/toolbar";
import {ButtonModule} from "primeng/button";
import {RippleModule} from "primeng/ripple";
import {AddSkillComponent} from './add-skill/add-skill.component';
import {DialogModule} from "primeng/dialog";
import {UpdateSkillComponent} from './update-skill/update-skill.component';
import {DeleteSkillComponent} from './delete-skill/delete-skill.component';
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {QuizListComponent} from "./quiz-list/quiz-list.component";
import {DeleteQuizComponent} from './delete-quiz/delete-quiz.component';
import {InputTextModule} from "primeng/inputtext";
import {ReactiveFormsModule} from "@angular/forms";
import { AddQuizComponent } from './add-quiz/add-quiz.component';
import { UpdataQuizComponent } from './updata-quiz/updata-quiz.component';


@NgModule({
  declarations: [
    SkillListComponent,
    AddSkillComponent,
    UpdateSkillComponent,
    DeleteSkillComponent,
    QuizListComponent,
    DeleteQuizComponent,
    AddQuizComponent,
    UpdataQuizComponent
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
    InputTextModule, ReactiveFormsModule
  ]
})
export class SkillModule {
}
