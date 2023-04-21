import { Injectable } from "@angular/core";
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { ErrorObserver, Observable, ObservableInput, of, throwError } from "rxjs";
import { catchError, map, switchMap, tap } from 'rxjs/operators';
import { Router } from "@angular/router";
import { AuthService } from "../services/auth.service";

@Injectable()
export class HttpErrorInterceptor implements HttpInterceptor {

    constructor(private router: Router, private authService: AuthService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        return next.handle(req).pipe(
            catchError(error => this.handleError(error))
        )
    }
    handleError(error: HttpErrorResponse): ObservableInput<any> {
        console.log('error is intercept')
        console.log('status : ' + error.status);
        console.log('statusText : ' + error.statusText);
        console.log('message : ' + error.error.message);
        if (error.status === 401) {
            console.log("401");

            this.router.navigateByUrl('auth/login');

        }
        else {
            this.router.navigateByUrl('errorPage',{state:{'status':error.status, 'statusText': error.statusText, 'message': error.error.message }});
        }
        return throwError(() => new Error('Something bad happened; please try again later.' + " " + this.errorToString(error)));
    }

    errorToString(error : {'status': number, 'statusText': string, 'message': string}): string{
        return (error.status.toString + " " + error.statusText + " " + error.message);
    }
}