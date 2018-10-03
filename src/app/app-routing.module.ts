import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SettingsComponent } from './settings';
import { LoginComponent, RegisterComponent, EmployeebookComponent } from './static';

const routes: Routes = [
  {
    path: 'login',
    //redirectTo: 'login',
    component: LoginComponent
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'about',
    redirectTo: 'about',
    pathMatch: 'full'
  },
//  {
    /*path: 'employeebook',
    redirectTo: '/employeebook',
    pathMatch: 'full'*/
//    path: 'employeebook', component: EmployeebookComponent, canActivate: [AuthGuard]
//  },
  {
    path: 'settings',
    component: SettingsComponent,
    data: {
      title: 'Settings'
    }
  },
  {
    path: 'examples',
    loadChildren: 'app/examples/examples.module#ExamplesModule'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
