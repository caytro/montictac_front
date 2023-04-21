import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Activity } from 'src/app/core/models/activity.model';
import { Period } from 'src/app/core/models/period.model';

@Component({
  selector: 'app-period-list',
  templateUrl: './period-list.component.html',
  styleUrls: ['./period-list.component.scss']
})


export class PeriodListComponent implements OnInit {

  @Input() activity !: Activity;
  @Output() deletePeriodEvent = new EventEmitter<Period>();
  @Output() updatePeriodEvent = new EventEmitter<{'updatedPeriod':Period, 'isRunning': boolean}>();

  ngOnInit(): void {

  }

  onDeletePeriod(event: Period): void {
    this.deletePeriodEvent.emit(event);
  }

  onSubmitEditPeriod(event: {'updatedPeriod':Period, 'isRunning': boolean}): void {
    this.updatePeriodEvent.emit(event);
  }

}
