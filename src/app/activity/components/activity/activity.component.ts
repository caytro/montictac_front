import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { interval, map, Observable, tap, timer } from 'rxjs';
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
  @Input() activityListComponent !: ActivityListComponent;

  constructor(private tictacService: MonTicTacService) { }

  buttonStartStopText!: string;
  periodListVisiblility: Boolean = false;
  buttonDisplayHidePeriodListText!: string;
  totalRunningPeriodTime$!: Observable<string>;
  totalRunningActivityTime$!: Observable<string>;
  buttonDeleteActivityImgUrl: string = "assets/images/fermer.png";

  ngOnInit() {
    this.setButtonStartStopText();
    this.setbuttonDisplayHidePeriodListText();
    if (this.isRunning()) {
      this.totalRunningActivityTime$ = timer(0, 10000).pipe(
        map(() => this.getTotalTimeToString())
      );
      this.totalRunningPeriodTime$ = timer(0, 10000).pipe(
        map(() => this.getPeriodTimeToString(this.activity.periods[0]))
      );
    }
    this.activityListComponent.activityComponents.push(this);

  }

  setButtonStartStopText() {
    this.buttonStartStopText = this.isRunning() ? "Stop" : "Start";
  }

  setbuttonDisplayHidePeriodListText() {
    this.buttonDisplayHidePeriodListText = this.periodListVisiblility ? "Masquer" : "Voir";
  }

  refreshDisplay(): void {
    this.setButtonStartStopText();
    this.setbuttonDisplayHidePeriodListText();
    if (this.isRunning()) {
      this.totalRunningActivityTime$ = timer(0, 10000).pipe(
        map(() => this.getTotalTimeToString())
      );
      this.totalRunningPeriodTime$ = timer(0, 10000).pipe(
        map(() => this.getPeriodTimeToString(this.activity.periods[0]))
      );
    }
  }


  reloadActivity(): void {
    this.tictacService.getActivityById(this.activity.id).pipe(
      map((activity) => this.tictacService.sortActivityPeriods(activity, 'desc')),
      tap((activity) => {
        this.activity = activity;
        this.refreshDisplay()
      })

    ).subscribe();
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



  getTotalTime(): number {
    let totalTime: number = 0;
    for (let i = 0; i < this.activity.periods.length; i++) {
      totalTime += this.tictacService.getPeriodDurationSeconds(this.activity.periods[i]);
    }
    return totalTime;
  }

  getTotalTimeToString(): string {
    return this.tictacService.convertSecondsToString(this.getTotalTime());
  }

  getPeriodTimeToString(period: Period): string {
    return this.tictacService.convertSecondsToString(this.tictacService.getPeriodDurationSeconds(period));
  }


  onClickShowHideActivity(): void{
    this.activityListComponent.ngOnInit();
    console.log(this.activityListComponent);
  }

  onClickDisplayHidePeriodList():void {
    this.periodListVisiblility = !this.periodListVisiblility;
    this.setbuttonDisplayHidePeriodListText();
  }


  onClickActivityStartStopButton(): void {
    if (this.isRunning()) {
      this.tictacService.stopActivity(this.activity).pipe(
        tap(() => this.setButtonStartStopText()),
        tap(() => {
          for (let activityComponent of this.activityListComponent.activityComponents) {
            activityComponent.reloadActivity();
          }
        }),
        tap(() => this.refreshDisplay())
      ).subscribe();
    }
    else {
      this.tictacService.startActivity(this.activity).pipe(
        tap((activity) => this.activity = activity),
        tap(() => this.setButtonStartStopText()),
        tap(() => {
          for (let activityComponent of this.activityListComponent.activityComponents) {
            activityComponent.reloadActivity();
          }
        }),
        tap(() => this.activityListComponent.updateActivities())
        //tap(() => this.refreshDisplay())
      ).subscribe();

    }
  }
}
