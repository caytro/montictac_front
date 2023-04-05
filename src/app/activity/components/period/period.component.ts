import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { Period } from 'src/app/core/models/period.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { ActivityComponent } from '../activity/activity.component';
import { FormBuilder, FormControl, NgForm } from '@angular/forms';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit {
  @Input() period !: Period;
  @Input() activityComponent !: ActivityComponent;

  @Output() editPeriodTitle = new EventEmitter<{title: string, period: Period}>();

  buttonDeleteImgUrl: string = "assets/images/fermer.png";
  buttonEditImgUrl: string = "assets/images/modifier.png";
  titleText!: string
  isVisibleFormPeriodTitle!: boolean;
  titleCtrl !: FormControl;

  periodDurationText$!: Observable<string>

  constructor(private tictacService: MonTicTacService, private formBuilder: FormBuilder) {

  }

  ngOnInit() {
    this.periodDurationText$ = timer(0, 10000).pipe(
      map(() => this.getDurationText()
      )
    )
    this.isVisibleFormPeriodTitle = false;
    this.titleCtrl = this.formBuilder.control((this.period.title ? this.period.title : ''));
  }

  onClickButtonDelete(): void {
    this.tictacService.deletePeriod(this.period).pipe(
      tap(() => this.activityComponent.reloadActivity()),
      tap(() => this.activityComponent.periodListVisiblility = true)
    ).subscribe();
  }

  onClickButtonEditTitle(): void {
    this.isVisibleFormPeriodTitle = true;


  }

  onSubmitTitleForm(): void {
    if (this.titleCtrl.value) {
      this.editPeriodTitle.emit({title:this.titleCtrl.value,period: this.period});
    }
    this.isVisibleFormPeriodTitle = false;
    /*
    if (title) {
      this.tictacService.updatePeriodTitle(this.period, title).pipe(
        tap((period) => this.period = period),
        tap(() => this.isVisibleFormPeriodTitle = false)
      ).subscribe();
    } else{
      
    }
    */
  }


  getDurationText() {
    return this.tictacService.convertSecondsToString(this.tictacService.getPeriodDurationSeconds(this.period));
  }
}
