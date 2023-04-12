import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { tap } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';

@Component({
  selector: 'app-period-form',
  templateUrl: './period-form.component.html',
  styleUrls: ['./period-form.component.scss']
})
export class PeriodFormComponent implements OnInit {
  id=0;
  title !: string;
  description !: string;
  form !: FormGroup;
  update : boolean = false;
  currentActivity !: Activity;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private ticTacService: MonTicTacService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      title: [null],
      description: [null]
    })
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id){
      this.update = true;
      this.ticTacService.getActivityById(id).pipe(
        tap((activity) => this.currentActivity = activity)
      ).subscribe();
    }
    else {
      this.currentActivity = new Activity(0,'','',[]);
    }
    
  }

  onClickButtonCancel() {
    this.router.navigateByUrl("");
  }

  onSubmitForm(event: Event) {
    console.log(this.form.value);
    this.currentActivity.title = this.form.value.title;
    this.currentActivity.description = this.form.value.description;
    this.ticTacService.createUpdateActivity(this.currentActivity).pipe(
      tap(()=>this.router.navigateByUrl(''))
    ).subscribe();
  }

}
