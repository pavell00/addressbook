import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { AddressbookComponent } from './addressbook/addressbook.component';

const routes: Routes = [
  {
    path: 'addressbook', component: AddressbookComponent, data: { title: 'addressbook' }
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
