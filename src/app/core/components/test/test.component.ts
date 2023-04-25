import { Component, OnInit } from "@angular/core";
import { Observable, map, tap } from "rxjs";
import { DateTimeService } from "../../services/date-time.service";

@Component({
  selector: 'async-observable-pipe',
  template: `<div><code>observable|async</code>:
       Time: {{ time$ | async }}</div>
       <button (click)= "onClickTestButton()" >Test {{ btnTxt }}</button>`
})



export class TestComponent implements OnInit {
  time$ = new Observable<string>(observer => {
    setInterval(() => observer.next(new Date().toString()), 1000);
  });

  monObs !: Observable<string>;
  btnTxt :string = "000";
  
  ngOnInit(): void {
    console.log('ngOnInit()');
    this.geoLocation();
    this.initMonObs();

  }

  initMonObs(): void{
    console.log('creating monObs');
    this.monObs = new Observable((observer) => {
      
      let clickDate = new Date();
      observer.next(clickDate.toLocaleString());
    })
  }
  onClickTestButton(){
    this.monObs.pipe(
      map((dateString) => { return 'Clicked at ' + dateString}),
      tap((dateString) => this.btnTxt = dateString)
    )
    .subscribe({
      next(dateString:string){
        console.log('next : ' + dateString);
      }
    })
    
  }

  geoLocation() {
    const locations = new Observable((observer) => {
      let watchId: number;

      // Simple geolocation API check provides values to publish
      if ('geolocation' in navigator) {
        console.log('geolocation ok');
        watchId = navigator.geolocation.watchPosition((position: GeolocationPosition) => {
          observer.next(position);
        }, (error: GeolocationPositionError) => {
          observer.error(error);
        });
      } else {
        observer.error('Geolocation not available');
        console.log('error geolocation not found');
      }

      // When the consumer unsubscribes, clean up data ready for next subscription.
      return {
        unsubscribe() {
          navigator.geolocation.clearWatch(watchId);
        }
      };
    });

    // Call subscribe() to start listening for updates.
    const locationsSubscription = locations.subscribe({
      next(position) {
        console.log('Current Position: ', position);
      },
      error(msg) {
        console.log('Error Getting Location: ', msg);
      }
    });

    // Stop listening for location after 10 seconds
    setTimeout(() => {
      locationsSubscription.unsubscribe();
    }, 10000);
  }
}