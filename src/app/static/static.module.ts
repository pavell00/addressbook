import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '@app/shared';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { AddressbookComponent } from './addressbook/addressbook.component';
import { DetailComponent } from './detail/detail.component';

@NgModule({
  imports: [SharedModule, StaticRoutingModule, Ng2SmartTableModule],
  declarations: [AboutComponent, FeaturesComponent, AddressbookComponent, DetailComponent]
})
export class StaticModule {}
