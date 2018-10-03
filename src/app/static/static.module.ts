import { NgModule } from '@angular/core';
import { Ng2SmartTableModule } from 'ng2-smart-table';
import { SharedModule } from '@app/shared';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { StaticRoutingModule } from './static-routing.module';
import { AboutComponent } from './about/about.component';
import { FeaturesComponent } from './features/features.component';
import { EmployeebookComponent } from './employeebook/employeebook.component';
import { DetailComponent } from './detail/detail.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@NgModule({
  imports: [
    SharedModule,
    StaticRoutingModule,
    Ng2SmartTableModule,
    FormsModule,
    ReactiveFormsModule
  ],
  declarations: [
    AboutComponent,
    FeaturesComponent,
    EmployeebookComponent,
    DetailComponent,
    LoginComponent,
    RegisterComponent
  ]
})
export class StaticModule {}
