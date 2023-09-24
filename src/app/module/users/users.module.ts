import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UsersRoutingModule } from './users-routing.module';
import { UserListComponent } from './user-list/user-list.component';
import {ButtonModule} from "primeng/button";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {InputTextModule} from "primeng/inputtext";
import {PaginatorModule} from "primeng/paginator";
import {ReactiveFormsModule} from "@angular/forms";
import {RippleModule} from "primeng/ripple";
import {SharedModule} from "../shared/shared.module";
import {ToolbarModule} from "primeng/toolbar";
import { AddUserComponent } from './add-user/add-user.component';
import { UpdateUserComponent } from './update-user/update-user.component';
import {DialogModule} from "primeng/dialog";
import { DeleteUserComponent } from './delete-user/delete-user.component';


@NgModule({
  declarations: [
    UserListComponent,
    AddUserComponent,
    UpdateUserComponent,
    DeleteUserComponent
  ],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ButtonModule,
    ConfirmDialogModule,
    InputTextModule,
    PaginatorModule,
    ReactiveFormsModule,
    RippleModule,
    SharedModule,
    ToolbarModule,
    DialogModule,
  ]
})
export class UsersModule { }
