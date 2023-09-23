import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AuthGuard} from "./guard/auth.guard";
import {HomeComponent} from "./module/home/home/home.component";

const routes: Routes = [
  {
    path: '', component: AppLayoutComponent,
    children: [
      {
        path: 'skill',
        loadChildren: () => import('./module/skill/skill.module').then(m => m.SkillModule),
      },
      {
        path: 'task',
        loadChildren: () => import('./module/task/task.module').then(m => m.TaskModule)
      },
      {
        path: 'home',
        component: HomeComponent
      }
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
