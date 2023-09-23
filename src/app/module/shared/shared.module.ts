import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {SharedRoutingModule} from './shared-routing.module';
import {TableComponent} from './table/table.component';
import {ToolbarModule} from 'primeng/toolbar';
import {ToastModule} from "primeng/toast";
import {ConfirmDialogModule} from "primeng/confirmdialog";
import {MessagesModule} from 'primeng/messages';
import {RippleModule} from "primeng/ripple";
import {ConfirmationService} from "primeng/api";
import {FormComponent} from './form/form.component';
import {ReactiveFormsModule} from "@angular/forms";
import {InputTextModule} from "primeng/inputtext";
import {InputTextareaModule} from "primeng/inputtextarea";
import {InputNumberModule} from "primeng/inputnumber";
import {PasswordModule} from "primeng/password";
import {RadioButtonModule} from "primeng/radiobutton";
import {MultiSelectModule} from "primeng/multiselect";
import {CalendarModule} from "primeng/calendar";
import {CheckboxModule} from "primeng/checkbox";
import {DropdownModule} from "primeng/dropdown";
import {MessageModule} from "primeng/message";
import {DialogModule} from "primeng/dialog";
import {TableModule} from "primeng/table";
import {AddFormComponent} from "./add-form/add-form.component";

@NgModule({
  declarations: [
    TableComponent,
    FormComponent,
    AddFormComponent,
  ],
  imports: [
    CommonModule,
    SharedRoutingModule,
    ToolbarModule,
    ToastModule,
    ConfirmDialogModule,
    MessagesModule,
    RippleModule,
    ReactiveFormsModule,
    InputTextModule,
    InputTextareaModule,
    InputNumberModule,
    PasswordModule,
    RadioButtonModule,
    MultiSelectModule,
    CalendarModule,
    CheckboxModule,
    DropdownModule,
    MessageModule,
    DialogModule,
    TableModule
  ],
  exports: [
    TableComponent,
    FormComponent,
    AddFormComponent

  ],
  providers: [ConfirmationService]
})
export class SharedModule {
}
