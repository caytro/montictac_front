import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { tap } from 'rxjs';
import { Activity } from 'src/app/core/models/activity.model';
import { MonTicTacService } from 'src/app/core/services/montictac.service';

@Component({
  selector: 'app-activity-form',
  templateUrl: './activity-form.component.html',
  styleUrls: ['./activity-form.component.scss']
})
export class ActivityFormComponent implements OnInit {
  id=0;
  form !: FormGroup;
  update : boolean = false;
  currentActivity !: Activity ;

  constructor(private formBuilder: FormBuilder, private router: Router, private route: ActivatedRoute, private ticTacService: MonTicTacService) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      formTitle: [null],
      formDescription: [null]
    })
    const id = Number(this.route.snapshot.paramMap.get('id'));
    if (id){
      this.update = true;
      this.ticTacService.getActivityById(id).pipe(
        tap((activity) => {
          this.currentActivity = activity;
          this.form.setValue({formTitle:this.currentActivity.title, formDescription:this.currentActivity.description}) ;
        })
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
    this.currentActivity.title = this.form.value.formTitle;
    this.currentActivity.description = this.form.value.formDescription;
    this.ticTacService.createUpdateActivity(this.currentActivity).pipe(
      tap(()=>this.router.navigateByUrl(''))
    ).subscribe();
  }

}
