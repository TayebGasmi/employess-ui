import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {UserListComponent} from "./user-list/user-list.component";
import {UserDashboardComponent} from "./user-dashboard/user-dashboard.component";

const routes: Routes = [
  {
    path:'',
    component:UserListComponent
  },
  {
    path:'dash',
    component:UserDashboardComponent
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UsersRoutingModule { }
