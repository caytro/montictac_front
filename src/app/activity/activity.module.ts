import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { RouterModule } from '@angular/router';
import { PeriodComponent } from './components/period/period.component';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    ActivityComponent,
    ActivityListComponent,
    PeriodComponent
  ]
})
export class ActivityModule { }
