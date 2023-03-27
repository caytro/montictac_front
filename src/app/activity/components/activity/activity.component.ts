import { Component, Input, OnInit } from '@angular/core';
import { Activity } from '../../../core/models/activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit{
  @Input() activity!: Activity;

  buttonText!: string;

  ngOnInit(){
    this.buttonText = this.activity.running ? "Stop" : "Start";
  }

  onActivityStartStopButtonClick(){
    this.activity.running = !this.activity.running;
    this.buttonText = this.activity.running ? "Stop" : "Start";
  } 
}
