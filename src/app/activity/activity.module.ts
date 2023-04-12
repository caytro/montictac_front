import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { RouterModule } from '@angular/router';
import { PeriodComponent } from './components/period/period.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// Directives
import { FocusDirective } from '../core/directives/focus.directive';



import { PeriodFormComponent } from './components/period-form/period-form.component';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent,
    FocusDirective,
    PeriodFormComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports:[
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent,
    ReactiveFormsModule
  ]
})
export class ActivityModule { }
