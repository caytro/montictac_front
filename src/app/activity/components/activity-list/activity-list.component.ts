import { Component, OnInit } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';


@Component({
  selector: 'app-activity-list',
  templateUrl: './activity-list.component.html',
  styleUrls: ['./activity-list.component.scss']
})
export class ActivityListComponent implements OnInit {
  //console.log('getInitialPeriodListVisibility : activity : ' + activity.id + " : " + activity.title);
  //console.log('visiblePeriodListActivityIds : ' + this.visiblePeriodListActivityIds)


  activities!: Activity[];
  visiblePeriodListActivityIds: boolean[] = [];

  displayModalMsgBox: boolean = false;
  msgBoxParams !: {
    'title': string,
    'message': string,
    'mbType': number,
    'responseHandler': Function
  }
  
  constructor(private tictacService: MonTicTacService) { }

  ngOnInit() {
    this.updateActivities();
    this.msgBoxParams = {
      'title': 'Default Title',
      'message': 'default message',
      'mbType': 0,
      'responseHandler': () =>{}
    }

  }

  updateActivities(): void {
    this.tictacService.getAllActivitiesOrderByLastStart().pipe(
      tap((activities) => this.activities = activities)

    )
      .subscribe();
  }

  onStartStopEvent(): void {
    this.updateActivities();
  }
  onModifyActivityEvent(): void {

    this.updateActivities();

  }
  onModifyPeriodListVisibilityEvent(event: { 'activityId': number, 'visible': boolean }) {
    //console.log('onModifyPeriodListVisibilityEvent');
    this.visiblePeriodListActivityIds[event.activityId] = event.visible;
  }

  getInitialPeriodListVisibility(activity: Activity): boolean {
    //console.log('getInitialPeriodListVisibility : activity : ' + activity.id + " : " + activity.title);
    //console.log('visiblePeriodListActivityIds : ' + this.visiblePeriodListActivityIds)
    if (this.visiblePeriodListActivityIds) {
      return this.visiblePeriodListActivityIds[activity.id] ?? false;
    }
    else {
      return false;
    }
  }

  onClickClickMeDiv() {
    this.msgBoxParams.title = 'testBox';
    this.msgBoxParams.message = 'Test du fonctionnement de la msgBox en utilisant des Observables pour que le component récupère le bouton cliqué';
    this.displayModalMsgBox = true;
    this.msgBoxParams.responseHandler = (response : string) =>{
      if (response == 'Ok'){
        console.log('msgBox : confirmation');
      }
      else{
        console.log('msgBox : Pas confirmation !')
      }
      this.displayModalMsgBox = false;
    }
  }


  showMsgBox(event: { 'title': string, 'message': string }) {
    this.msgBoxParams.title = event.title;
    this.msgBoxParams.message = event.message;
    this.displayModalMsgBox = true;
  }

  onMsgBoxResponse(response:string){
    console.log(response);
    this.msgBoxParams.responseHandler(response);

  }
  
}
