import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit{

  activities$!: Observable<Activity[]>;
  
  constructor( private tictacService: MonTicTacService){

  }

  ngOnInit(){
    //this.activities$ = this.tictacService.getAllActivities();
    this.activities$ = this.tictacService.getAllActivitiesOrderByLastStart();
  }

}
