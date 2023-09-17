import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AppLayoutComponent} from "./layout/app.layout.component";
import {TableComponent} from "./module/shared/table/table.component";

const routes: Routes = [
  {path:'',component:AppLayoutComponent,
    children:[
      {
        path: 'skill',
        loadChildren: () => import('./module/skill/skill.module').then(m => m.SkillModule)
      },
    ]

  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule {

}
