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
import { PeriodListComponent } from './components/period-list/period-list.component';
import { CoreModule } from '../core/core.module';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent,
    FocusDirective,
    PeriodFormComponent,
    PeriodListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    CoreModule
  ],
  exports:[
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent,
    ReactiveFormsModule
  ]
})
export class ActivityModule { }
