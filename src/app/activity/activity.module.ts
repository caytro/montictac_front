import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { RouterModule } from '@angular/router';
import { PeriodComponent } from './components/period/period.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//Material

import { MaterialModule } from '../core/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    MaterialModule,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ],
  exports:[
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent,
    BrowserAnimationsModule,
    ReactiveFormsModule
  ]
})
export class ActivityModule { }
