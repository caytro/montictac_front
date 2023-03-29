import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, map, Observable, tap } from 'rxjs';
import { Period } from 'src/app/core/models/period.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { Activity } from '../../../core/models/activity.model';
import { ActivityListComponent } from '../activity-list/activity-list.component';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;
  @Input() activityList !: ActivityListComponent;

  constructor(private tictacService: MonTicTacService, private router: Router) { }

  buttonStartStopText!: string;
  periodListVisiblility: Boolean = false;
  buttonDisplayHidePeriodListText!: string;
  totalRunningPeriodTime$!: Observable<string>;
  totalRunningActivityTime$!: Observable<string>;

  ngOnInit() {
    this.setButtonStartStopText();
    this.setbuttonDisplayHidePeriodListText();
    this.totalRunningActivityTime$ = interval(1000).pipe(
      map(()=>this.getTotalTimeToString())      
    );
    this.totalRunningPeriodTime$ = interval(1000).pipe(
      map(()=>this.getPeriodTimeToString(this.activity.periods[0]))      
    );

  }

  setButtonStartStopText() {
    this.buttonStartStopText = this.isRunning() ? "Stop" : "Start";
  }

  setbuttonDisplayHidePeriodListText(){
    this.buttonDisplayHidePeriodListText = this.periodListVisiblility ? "Masquer" : "Voir";
  }

  refreshActivities(): void {
    this.activityList.ngOnInit();
  }

  isRunning(): boolean {
    if (this.activity.periods.length === 0) {
      return false;
    }
    for (let i = 0; i < this.activity.periods.length; i++) {
      if (!this.activity.periods[i].stop) {
        return true;
      }
    }
    return false;
  }


  
  getTotalTime() : number{
    let totalTime: number = 0;
    for (let i = 0; i < this.activity.periods.length; i++) {
      totalTime += this.tictacService.getPeriodDurationSeconds(this.activity.periods[i]);
    }
    return totalTime;
  }

  getTotalTimeToString(): string{
    return this.tictacService.convertSecondsToString(this.getTotalTime());
  }

  getPeriodTimeToString(period : Period): string{
    return this.tictacService.convertSecondsToString(this.tictacService.getPeriodDurationSeconds(period));
  }

  

  
  onClickDisplayHidePeriodList(){
    this.periodListVisiblility = !this.periodListVisiblility;
    this.setbuttonDisplayHidePeriodListText();
  }


  onActivityStartStopButtonClick(): void {
    if (this.isRunning()) {
      this.tictacService.stopActivity(this.activity).pipe(
        tap((activity) => this.activity = activity),
        tap(() => this.setButtonStartStopText()),
        tap(() => this.refreshActivities()),
      )
        .subscribe();
    }
    else {
      this.tictacService.startActivity(this.activity).pipe(
        tap((activity) => this.activity = activity),
        tap(() => this.setButtonStartStopText()),
        tap(() => this.refreshActivities())
      )
        .subscribe();

    }
  }
}
