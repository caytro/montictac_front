import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/core/models/activity.model';
import { Period } from 'src/app/core/models/period.model';
import { ActivityComponent } from '../activity/activity.component';

@Component({
  selector: 'app-period',
  templateUrl: './period.component.html',
  styleUrls: ['./period.component.scss']
})
export class PeriodComponent implements OnInit{
@Input() period !: Period;
@Input() activity !: ActivityComponent;

  ngOnInit(){

  }
}
