import { Component, Directive, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { map, Observable, tap, timer } from 'rxjs';
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

  @Output() submitPeriodTitle = new EventEmitter<{title: string, period: Period}>();
  
  
  buttonDeleteImgUrl: string = "assets/images/fermer.png";
  buttonEditImgUrl: string = "assets/images/modifier.png";
  titleText!: string
  isVisiblePeriodForm!: boolean;
  titleCtrl !: FormControl;
  titlePlaceHolder : string = 'Période Sans Nom';

  periodDurationText$!: Observable<string>

  constructor(private tictacService: MonTicTacService, private formBuilder: FormBuilder) {  }


  ngOnInit() {
    this.periodDurationText$ = timer(0, 10000).pipe(
      map(() => this.getDurationText()
      )
    )
    this.isVisiblePeriodForm = false;
    this.titleCtrl = this.formBuilder.control((this.period.title ? this.period.title : ''));
  }
  
  onClickButtonDelete(): void {
    this.tictacService.deletePeriod(this.period).pipe(
      tap(() => this.activityComponent.reloadActivity()),
      tap(() => this.activityComponent.periodListVisiblility = true)
    ).subscribe();
  }

  onClickButtonEditTitle(): void {
    this.isVisiblePeriodForm = true;
      }

  onSubmitTitleForm(): void {
    if (this.titleCtrl.value) {
      this.submitPeriodTitle.emit({title:this.titleCtrl.value,period: this.period});
    }
    this.isVisiblePeriodForm = false;
    
  }

 

  getDurationText() {
    return this.tictacService.convertSecondsToString(this.tictacService.getPeriodDurationSeconds(this.period));
  }
}
