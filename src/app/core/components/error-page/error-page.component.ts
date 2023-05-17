import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-page',
  templateUrl: './error-page.component.html',
  styleUrls: ['./error-page.component.scss']
})
export class ErrorPageComponent implements OnInit{

  error!: {status:number, statusText:string, message: string};

  constructor(private router:Router){
    const currentNavigation = this.router.getCurrentNavigation();
    if (currentNavigation){
      console.log('currentNavigation ok');
      const state = currentNavigation.extras.state;
      if (state){
        console.log ('state ok');
        console.log('status' + state['status']);
        
        this.error = {'status': state['status'], 'statusText': state['statusText'], 'message': state['message']}
        
      }
    }
  }

  ngOnInit(): void {
    
    console.log(this.error);
  }

}
