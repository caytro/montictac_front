import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';
import { RouterModule } from '@angular/router';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivityListComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
  ],
  exports:[
    ActivityComponent,
    ActivityListComponent
  ]
})
export class ActivityModule { }
