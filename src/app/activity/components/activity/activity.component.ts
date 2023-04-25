import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { concatMap, interval, map, Observable, switchMap, tap, timer } from 'rxjs';
import { Period } from 'src/app/core/models/period.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { Activity } from '../../../core/models/activity.model';
import { ActivityListComponent } from '../activity-list/activity-list.component';
import { MsgBoxParams } from 'src/app/core/models/msg-box-params.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;
  @Input() initialPeriodListVisibility !: boolean;
  @Output() startStopEvent = new EventEmitter();
  @Output() modifyActivityEvent = new EventEmitter();
  @Output() modififyPeriodListVisibility = new EventEmitter<{ 'activityId': number, 'visible': boolean }>();

  @Output() showMsgBox = new EventEmitter<{ 'title': string, 'message': string }>();

  constructor(private tictacService: MonTicTacService, private router: Router) { }

  buttonStartStopText!: string;
  periodListVisiblility!: boolean;
  showNewPeriodForm: Boolean = false;


  newPeriod !: Period;

  totalRunningPeriodTime$!: Observable<string>;
  totalRunningActivityTime$!: Observable<string>;

  buttonCreatePeriodImgUrl: string = "assets/images/ajouter.png";
  buttonDeleteActivityImgUrl: string = "assets/images/fermer.png";
  buttonEditActivityImgUrl: string = "assets/images/modifier.png";

  //MsgBox
  msgBoxParams: MsgBoxParams = new MsgBoxParams({});

  ngOnInit() {
    //console.log('activityComponent - ngOnInit this.activity : ' + this.activity.id + " : " + this.activity.title);
    //console.log('activityComponent - ngOnInit this.initialPeriodListVisibility : ' + this.initialPeriodListVisibility);
    this.setButtonStartStopText();
    this.periodListVisiblility = this.initialPeriodListVisibility;
    if (this.isRunning()) {
      this.totalRunningActivityTime$ = timer(0, 10000).pipe(
        map(() => this.getTotalTimeToString())
      );
      this.totalRunningPeriodTime$ = timer(0, 10000).pipe(
        map(() => this.getPeriodTimeToString(this.activity.periods[0]))
      );
    }

  }

  setButtonStartStopText() {
    this.buttonStartStopText = this.isRunning() ? "Stop" : "Start";
  }

  refreshDisplay(): void {
    this.setButtonStartStopText();
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


  onClickEditActivity() {
    this.router.navigateByUrl('updateActivity/' + this.activity.id);
  }

  onClickDeleteActivity() {
    let mbType = MsgBoxParams.YES_BUTTON + MsgBoxParams.NO_BUTTON;
    let message = "Confirmer la suppression de l'activité " + this.activity.title + "?";
    this.msgBoxParams = new MsgBoxParams({
      title: 'Confirmation', message: message, mbType: mbType, visible: true,
      responseHandler:
        ((response: string) => {
          console.log(response);
          if (response === 'Yes') {
            this.tictacService.deleteActivity(this.activity).pipe(
              tap(() => this.modifyActivityEvent.emit())
            ).subscribe();
          }
          this.msgBoxParams.visible = false
        })
    });


  }

  onClickDisplayHidePeriodList(): void {
    this.periodListVisiblility = !this.periodListVisiblility;
    this.modififyPeriodListVisibility.emit({ 'activityId': this.activity.id, 'visible': this.periodListVisiblility });
  }


  onClickActivityStartStopButton(): void {
    if (this.isRunning()) {
      this.tictacService.stopActivity(this.activity).pipe(
        tap(() => this.startStopEvent.emit()),
        tap(() => this.refreshDisplay())
      ).subscribe();
    }
    else {
      this.tictacService.startActivity(this.activity).pipe(
        tap((activity) => this.activity = activity),
        tap(() => this.startStopEvent.emit()),
        tap(() => this.refreshDisplay())
      ).subscribe();

    }
  }

  onClickCreatePeriod() {
    this.newPeriod = new Period(0, new Date(), new Date(), null);
    this.showNewPeriodForm = true;
  }

  onSubmitNewPeriodForm(event: { 'updatedPeriod': Period, 'isRunning': boolean }) {
    this.tictacService.createPeriod(event.updatedPeriod, this.activity).pipe(
      tap(() => this.reloadActivity())
    ).subscribe();

  }
  onCancelNewPeriodForm() {
    this.showNewPeriodForm = false;
  }

  onSubmitEditPeriodForm(event: { 'updatedPeriod': Period, 'isRunning': boolean }): void {
    //console.log(event.updatedPeriod);
    this.tictacService.updatePeriod(event.updatedPeriod, event.isRunning).pipe(
      concatMap(() => this.tictacService.getActivityById(this.activity.id).pipe(
        tap((activity) => this.tictacService.sortActivityPeriods(activity, 'desc')),
        tap((activity) => this.activity = activity),
        tap(() => this.refreshDisplay()),
        tap(() => this.modifyActivityEvent.emit())
      ))).subscribe();
  }

  onDeletePeriod(period: Period): void {

    let mbType = MsgBoxParams.YES_BUTTON + MsgBoxParams.NO_BUTTON;
    let message = "Confirmer la suppression de la période  " + (period.title ?? "Période sans titre") +
      " de l'activité " + this.activity.title + " ?";
    this.msgBoxParams = new MsgBoxParams({
      title: 'Confirmation', message: message, mbType: mbType, visible: true,
      responseHandler:
        ((response: string) => {
          console.log(response);
          if (response === 'Yes') {
            this.tictacService.deletePeriod(period).pipe(
              tap(() => this.modifyActivityEvent.emit()),

            ).subscribe();
          }
          this.msgBoxParams.visible = false
        })
    });
  }
}
