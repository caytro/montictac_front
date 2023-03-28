import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, switchMap } from "rxjs";

import { Activity } from "../models/activity.model";

@Injectable({
  providedIn: 'root'
})




export class MonTicTacService {

  activities!: Activity[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': '*/*'
    })
  } 


  constructor(private http: HttpClient){
  }


  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('http://localhost:8000/api/activity/list');
  }

  getActivityById(id : number): Observable<Activity> {
    return this.http.get<Activity>('http://localhost:8000/api/activity/' + id);
  }

  stopActivity(activity : Activity): Observable<Activity[]> {
    return this.http.get<Activity>('http://localhost:8000/api/activity/stop/' + activity.id).pipe(
      switchMap(() => this.getAllActivities())
    );
  }

  startActivity(activity : Activity): Observable<Activity[]> {
    return this.http.get<Activity>('http://localhost:8000/api/activity/start/' + activity.id).pipe(
      switchMap(() => this.getAllActivities())
    );
  }

}