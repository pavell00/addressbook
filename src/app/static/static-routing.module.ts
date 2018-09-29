import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { AddressbookComponent } from './addressbook/addressbook.component';
import { AuthGuardService as AuthGuard } from '../core';

const routes: Routes = [
  {
    path: 'addressbook', component: AddressbookComponent, data: { title: 'addressbook'}, canActivate: [AuthGuard] 
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
