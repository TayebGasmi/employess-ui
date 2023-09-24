import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {AuthGuard} from "./guard/auth.guard";
import {HomeComponent} from "./home/home.component";
import {ProfileComponent} from "./profile/profile.component";

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
        path: 'user',
        loadChildren: () => import('./module/users/users.module').then(m => m.UsersModule)
      },
      {
        path: 'job',
        loadChildren: () => import('./module/job/job.module').then(m => m.JobModule)
      },
      {
        path: 'home',
        component: HomeComponent
      },
      {
        path: 'profile',
        component: ProfileComponent,
      },

      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
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
