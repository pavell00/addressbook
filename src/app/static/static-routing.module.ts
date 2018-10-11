import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { EmployeebookComponent } from './employeebook/employeebook.component';
import { AuthGuardService as AuthGuard } from '@app/core';

const routes: Routes = [
  {
    path: 'employeebook', component: EmployeebookComponent, data: { title: 'eBook'}, canActivate: [AuthGuard] 
  },
  {
    path: 'features', component: FeaturesComponent, data: { title: 'Features' }
  },
  {
    path: 'about', component: AboutComponent, data: { title: 'About' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StaticRoutingModule {}
