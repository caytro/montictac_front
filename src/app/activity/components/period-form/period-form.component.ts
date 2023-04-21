import { Time, formatDate } from '@angular/common';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { Period } from 'src/app/core/models/period.model';
import { DateTimeService } from 'src/app/core/services/date-time.service';
import { MonTicTacService } from 'src/app/core/services/montictac.service';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.scss']
})


export class PeriodFormComponent implements OnInit {

  @Input() period !: Period;
  @Output() submitPeriodFormEvent = new EventEmitter<{ updatedPeriod: Period, isRunning: boolean }>();
  @Output() cancelPeriodFormEvent = new EventEmitter<{}>();


  form !: FormGroup;
  update: boolean = false;
  currentPeriod !: Period;

  constructor(private formBuilder: FormBuilder,
    private router: Router,
    private route: ActivatedRoute,
    private ticTacService: MonTicTacService,
    private dateTimeService: DateTimeService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      formTitle: [null],
      formStartDate: [null],
      formStartTime: [null],
      formEndDate: [null],
      formEndTime: [null],
    })
    if (this.period.id > 0) {
      this.update = true;
    }
    this.currentPeriod = this.period;

    console.log(this.currentPeriod);
    this.form.setValue({
      formTitle: this.currentPeriod.title,
      formStartDate: formatDate(this.currentPeriod.start, 'yyyy-MM-dd', 'fr-FR'),
      formStartTime: formatDate(this.currentPeriod.start, 'HH:mm:ss', 'fr-FR'),
      formEndDate: formatDate(this.currentPeriod.stop, 'yyyy-MM-dd', 'fr-FR'),
      formEndTime: formatDate(this.currentPeriod.stop, 'HH:mm:ss', 'fr-FR'),
    });
    console.log(this.form.value);
    //console.log(this.currentPeriod.start.getHours() + ":" + this.currentPeriod.start.getMinutes());

  }

  onClickButtonCancel() {
    this.cancelPeriodFormEvent.emit();
  }

  onSubmitForm() {
    let updatedPeriod = new Period(this.period.id,
      new Date(String(this.form.value.formStartDate) + " " + String(this.form.value.formStartTime)),
      new Date(String(this.form.value.formEndDate) + " " + String(this.form.value.formEndTime)),
      this.form.value.formTitle);
    console.log(updatedPeriod);
    this.submitPeriodFormEvent.emit({ 'updatedPeriod': updatedPeriod, 'isRunning': !!this.currentPeriod.stop });
  }

}
