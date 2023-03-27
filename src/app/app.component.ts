import { Component, OnInit } from '@angular/core';
import { Activity } from './core/models/activity.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  activity!: Activity;

  ngOnInit(){
    this.activity = new Activity('Codding MonTicTac Front', 'Using Angular', false);
  }
}
