import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, tap } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MsgBoxParams } from 'src/app/core/models/msg-box-params.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  //console.log('getInitialPeriodListVisibility : activity : ' + activity.id + " : " + activity.title);
  //console.log('visiblePeriodListActivityIds : ' + this.visiblePeriodListActivityIds)


  activities!: Activity[];
  visiblePeriodListActivityIds: boolean[] = [];
  msgBoxParams: MsgBoxParams = new MsgBoxParams({});

  constructor(private tictacService: MonTicTacService, private router: Router) { }

  ngOnInit() {
    this.updateActivities();
  }

  updateActivities(): void {
    this.tictacService.getAllActivitiesOrderByLastStart().pipe(
      tap((activities) => this.activities = activities),
      tap(() => {
        if (this.activities.length === 0) {
          this.msgBoxParams = {
            title: 'Créer une activité',
            message: 'Vous pouvez créer une activité pour démarrer',
            mbType: MsgBoxParams.OK_BUTTON,
            visible: true,
            responseHandler: ((response: string) => {
              this.msgBoxParams.visible = false;
              this.router.navigateByUrl('createActivity');
            })
          }
        }
      })

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
    //console.log('onModifyPeriodListVisibilityEvent');
    this.visiblePeriodListActivityIds[event.activityId] = event.visible;
  }

  getInitialPeriodListVisibility(activity: Activity): boolean {
    //console.log('getInitialPeriodListVisibility : activity : ' + activity.id + " : " + activity.title);
    //console.log('visiblePeriodListActivityIds : ' + this.visiblePeriodListActivityIds)
    if (this.visiblePeriodListActivityIds) {
      return this.visiblePeriodListActivityIds[activity.id] ?? false;
    }
    else {
      return false;
    }
  }
}
