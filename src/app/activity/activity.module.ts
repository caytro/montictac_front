import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivityComponent } from './components/activity/activity.component';
import { ActivityListComponent } from './components/activity-list/activity-list.component';



@NgModule({
  declarations: [
    ActivityComponent,
    ActivityListComponent
  ],
  imports: [
    CommonModule
  ],
  exports:[
    ActivityComponent,
    ActivityListComponent
  ]
})
export class ActivityModule { }
