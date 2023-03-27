import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit{

  userName!: string;
  password!: string;
  
  ngOnInit(): void {
    
  }

  onSubmitLoginForm(form: NgForm){
    console.log(form.value);
  }
}
