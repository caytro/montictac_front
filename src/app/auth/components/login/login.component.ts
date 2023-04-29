import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { tap } from 'rxjs';
import { AuthService } from 'src/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  userName!: string;
  password!: string;


  constructor(private auth: AuthService, private router: Router) { }

  ngOnInit(): void {

  }

  onSubmitLoginForm(form: NgForm) {
    this.auth.login(form.value.username, form.value.password).pipe(
      tap(() => this.router.navigateByUrl(''))
    ).subscribe();
    

  }
}
