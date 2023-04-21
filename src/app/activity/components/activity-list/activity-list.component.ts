import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { ActivityComponent } from '../activity/activity.component';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {

  activities!: Activity[];
  visiblePeriodListActivityIds !: boolean[];
  constructor(private tictacService: MonTicTacService) { }

  ngOnInit() {
    this.updateActivities();

  }

  updateActivities(): void {
    this.tictacService.getAllActivitiesOrderByLastStart().pipe(
      tap((activities) => this.activities = activities)
      
    )
      .subscribe();
  }

  onStartStopEvent(): void {
    this.updateActivities();
  }
  onModifyActivityEvent(): void {
    
    this.updateActivities();
   
  }
  onModifyPeriodListVisibilityEvent(event: { 'activityId': number, 'visible': boolean }) {
    this.visiblePeriodListActivityIds[event.activityId] = event.visible;
  }

  getInitialPeriodListVisibility(activity: Activity): boolean {
    if (this.visiblePeriodListActivityIds){
      return this.visiblePeriodListActivityIds[activity.id] ?? false;
    }
    else{
      return false;
    }
    
  }
}
