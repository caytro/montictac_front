import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { Period } from 'src/app/core/models/period.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';
import { Activity } from '../../../core/models/activity.model';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.scss']
})

export class ActivityComponent implements OnInit {
  @Input() activity!: Activity;

  constructor(private tictacService: MonTicTacService, private router: Router) { }

  buttonText!: string;

  ngOnInit() {
    this.buttonText = this.isRunning() ? "Stop" : "Start";
    console.log(Activity);
  }

  onActivityStartStopButtonClick(): void {
    if (this.isRunning()) {
      this.tictacService.stopActivity(this.activity).pipe(
        tap(() => window.location.reload()))
        .subscribe();
    }
    else {
      this.tictacService.startActivity(this.activity).pipe(
        tap(() => window.location.reload()))
        .subscribe();

    }
  }

  isRunning(): boolean {
    if (this.activity.periods.length === 0) {
      return false;
    }
    for (let i = 0; i < this.activity.periods.length; i++) {
      if (!this.activity.periods[i].stop) {
        return true;
      }
    }
    return false;
  }

  getLastPeriod(): Period | null {
    const periods = this.activity.periods;
    if (periods.length === 0) {
      return null;
    }
    return periods.sort((a, b) => a.start.getTime() - b.start.getTime())[periods.length - 1];
  }
}
