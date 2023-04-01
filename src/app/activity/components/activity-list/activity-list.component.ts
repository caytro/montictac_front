import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { ActivityComponent } from '../activity/activity.component';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit{

  activities$!: Observable<Activity[]>;
  activityComponents : ActivityComponent[] = [];
  
  
  constructor( private tictacService: MonTicTacService){

  }

  ngOnInit(){
    this.activities$ = this.updateActivities();    
  }

  updateActivities():Observable<Activity[]>{
    return this.activities$ = this.tictacService.getAllActivitiesOrderByLastStart();
  }
  
}
