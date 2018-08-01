import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '@app/shared';

import { FormsModule, ReactiveFormsModule }         from '@angular/forms';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { AddressbookComponent } from './addressbook/addressbook.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, Ng2SmartTableModule, FormsModule, ReactiveFormsModule],
  declarations: [AboutComponent, FeaturesComponent, AddressbookComponent, DetailComponent, LoginComponent]
})
export class StaticModule {}
