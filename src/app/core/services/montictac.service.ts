import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { map, Observable, switchMap } from "rxjs";
import { ActivityComponent } from "src/app/activity/components/activity/activity.component";

import { Activity } from "../models/activity.model";
import { Period } from "../models/period.model";

@Injectable({
  providedIn: 'root'
})




export class MonTicTacService {

  activities!: Activity[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': '*/*'
    })
  }
  serverUrl: string = 'http://localhost:8000/api';


  constructor(private http: HttpClient) {
  }

  /*
   * Activities
   */

  getAllActivities(): Observable<Activity[]> {
    const url = this.serverUrl + "/activity/list"
    return this.http.get<Activity[]>(url);
  }

  getAllActivitiesOrderByLastStart(): Observable<Activity[]> {
    return this.getAllActivities().pipe(
      map((activities) => this.sortActivitiesBylastStart(activities)

      ));
  }
  getActivityById(id: number): Observable<Activity> {
    const url = this.serverUrl + "/activity/" + id;
    return this.http.get<Activity>(url);
  }



  stopActivity(activity: Activity): Observable<Activity> {
    const url = this.serverUrl + '/activity/stop/' + activity.id;
    return this.http.get<Activity>(url);
  }

  startActivity(activity: Activity): Observable<Activity> {
    const url = this.serverUrl + '/activity/start/' + activity.id;
    return this.http.get<Activity>(url);
  }

  sortActivityPeriods(activity: Activity, direction: string): Activity {
    console.log(activity);
    activity.periods = activity.periods.sort((a, b) => (direction === "asc" ? -1 : 1) * (new Date(b.start).getTime() - new Date(a.start).getTime()));
    return activity;
  }

  sortActivitiesPeriods(activities: Activity[], direction: string): Activity[] {
    activities.forEach((activity) => { this.sortActivityPeriods(activity, direction) });
    return activities;
  }

  sortActivitiesBylastStart(activities: Activity[]): Activity[] {
    activities = this.sortActivitiesPeriods(activities, 'desc');
    activities.sort((a, b) => {
      let astart = (a.periods.length > 0 ? new Date(a.periods[0].start).getTime() : 0);
      let bstart = (b.periods.length > 0 ? new Date(b.periods[0].start).getTime() : 0);
      return bstart - astart;
    })
    return activities;
  }

  sortActivityComponentsByLastStart(activityComponents: ActivityComponent[]): ActivityComponent[] {

    for (let activityComponent of activityComponents) {
      activityComponent.activity = this.sortActivityPeriods(activityComponent.activity, 'desc');
    }
    activityComponents.sort((a, b) => {
      let astart = (a.activity.periods.length > 0 ? new Date(a.activity.periods[0].start).getTime() : 0);
      let bstart = (b.activity.periods.length > 0 ? new Date(b.activity.periods[0].start).getTime() : 0);
      return bstart - astart;
    });
    return activityComponents;

  }

  /*
   * Periodes
   */

  deletePeriod(period: Period): Observable<Object> {
    return this.http.delete('http://localhost:8000/api/period/' + period.id);
  }

  getPeriodDurationSeconds(period: Period): number {
    let start = new Date(period.start).getTime();
    let stop !: number;
    if (period.stop) {
      stop = new Date(period.stop).getTime();
    } else {
      stop = new Date().getTime();
    }

    return Math.floor((stop - start) / 1000);
  }

  convertSecondsToString(seconds: number): string {

    if (seconds == 0) {
      return '0 seconde';
    }
    let secondsByDay: number = 86400;
    let secondsByHour: number = 3600;
    let secondsByMinute: number = 60;

    let days = Math.floor(seconds / secondsByDay);
    seconds = seconds % secondsByDay;
    let hours = Math.floor(seconds / secondsByHour);
    seconds = seconds % secondsByHour;
    let minutes = Math.floor(seconds / secondsByMinute);
    seconds = seconds % secondsByMinute;
    let response: string = '';
    if (days > 0) {
      response = days + " jour" + (days > 1 ? "s " : " ");
    }
    if (hours > 0) {
      response += hours + " heure" + (hours > 1 ? "s " : " ");
    }
    if (minutes > 0) {
      response += minutes + " minute" + (minutes > 1 ? "s " : " ");
    }
    if (seconds > 0) {
      response += seconds + " seconde" + (seconds > 1 ? "s " : " ");
    }
    return response;
  }
}