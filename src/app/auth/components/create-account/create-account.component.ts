import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Route, Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-create-account',
  templateUrl: './create-account.component.html',
  styleUrls: ['./create-account.component.scss']
})
export class CreateAccountComponent implements OnInit {

  form !: FormGroup;

  constructor(private auth: AuthService, private router: Router,
    private formBuilder: FormBuilder) { }

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      userMail: [null],
      password: [null],
      passwordCheck: [null]
    })
  }
  onSubmitCreateAccountForm() {
    console.log(this.form.value.userMail + ":" + this.form.value.password);
    this.auth.createAccount(this.form.value.userMail, this.form.value.password).pipe(
      tap(() => this.router.navigateByUrl(''))
    ).subscribe();


  }
}
