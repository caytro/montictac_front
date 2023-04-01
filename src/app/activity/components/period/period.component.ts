import { Component, Input, OnInit } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { Period } from 'src/app/core/models/period.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  @Input() period !: Period;
  @Input() activityComponent !: ActivityComponent;

  buttonDeleteImgUrl: string = "assets/images/fermer.png";
  buttonEditImgUrl: string = "assets/images/modifier.png";

  periodDurationText$!: Observable<string>

  constructor(private tictacService: MonTicTacService) { }

  ngOnInit() {
    this.periodDurationText$ = timer(0, 10000).pipe(
      map(() => this.getDurationText()
      )
    )
  }

  onClickButtonDelete(): void {
    this.tictacService.deletePeriod(this.period).pipe(
      tap(() => this.activityComponent.reloadActivity()),
      tap(() => this.activityComponent.periodListVisiblility = true)
    ).subscribe();
  }

  onClickButtonEdit(): void {

  }

  getDurationText() {
    return this.tictacService.convertSecondsToString(this.tictacService.getPeriodDurationSeconds(this.period));
  }
}
