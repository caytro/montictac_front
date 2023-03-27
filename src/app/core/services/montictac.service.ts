import { HttpClient,HttpHeaders  } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";

import { Activity } from "../models/activity.model";

@Injectable({
  providedIn: 'root'
})




export class MonTicTacService {

  activities!: Activity[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Accept': '*/*',
      Authorization: "Bearer " + "eyJ0eXAiOiJKV1QiLCJhbGciOiJSUzI1NiJ9.eyJpYXQiOjE2Nzk5MjU4NDIsImV4cCI6MTY3OTk1NDY0Miwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJuYW1lIjoic3lsdmFpbkBtb250aWN0YWMuZnIifQ.Xd6R9vfhHSHNJ9H6ITa4edBefaxoeOspBUqMRGL5GtEKLc35xlQQcTvfw6QN28J6oHrq8SsIk57bz5yp80VTV51001KhM6mzCeRs9St7eA5-dD22xd0uigw4WY2YIv6poIvjLiJcoIJubCqScjt1m4okUyXYo3W6_ljCBPBLlf-P58R478S9oiC-M3SB2hj82P5RT89PFeIY5noKbyTHMUgNDFvxAqTs0iuimKz1CCylTTXqr1kUD4hEyOCqVoWOzWJ-zYISgo_EIk0i5RkYNHfSHWgU285GsbWaYiRrPkvwtLWOf6guuDI9bZMlXh7TTQKAb6JLHyZFvQj2qdoUCINRFDhq0C0SHJ6lj-bfb6dsFI6tLDnTCaxXDErLxx0QttP7clY2x3d7ivjgPXjljTWVc7pKR91pUkNpzYV9crp-8I8Gxs9pv9kD4QA6sOnOZxYodVF7O_FfvP-HCIgDdpszomJXga6w38iU-Xnq8SUeKOoiT9caXneLZiurdUr20hXGh1lIqyz5rTD--nx336YkT8ma0TFmWdq799HGywgY3n7Jc6_sKtmcbXKVzIOjfsOUpgHqYpTp5DLK0Xmdwh0IqZOvI8_YV81yLUxE1VorX4FrF7BZvX89lCfytMdAUIBBTZXK-2ifJXn-v032PwNdnRztAkAngztWaXQUwR8"
    })
  } 


  constructor(private http: HttpClient){
    this.activities = [
      new Activity('Coding MonTicTac front','Angular', true ),
      new Activity('Marche', 'Bord de Garonne', false),
      new Activity('Soutien Scolaire', 'En visio Discord', false)
    ];
  }


 


  check_login(userName: string, password: string){

  }

  getAllActivities(): Observable<Activity[]> {
    return this.http.get<Activity[]>('http://localhost:8000/api/activity/list');
  }
  
}