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
            catchError(error => this.handleError(error, req))
        )
    }
    handleError(error: HttpErrorResponse, req: HttpRequest<any>): ObservableInput<any> {
        console.log('error is intercept');
        console.log('error :' + JSON.stringify(error, null, 4));
        console.log('status : ' + error.status);
        console.log('statusText : ' + error.statusText);
        console.log('message : ' + error.error.message);
        console.log('Req : ' + JSON.stringify(req, null, 4));
        if (error.status === 400){
            this.router.navigateByUrl('errorPage', { state: { 'status': error.status, 'statusText': 'Requête incorrecte', 'message': error.error.message } });
        }
        else if (error.status === 401) {
            console.log("401");

            this.router.navigateByUrl('auth/login');

        }
        else if (error.status === 500) {
            console.log(error.error.code);
            if (error.error.code === 1062) {
                let message = "L'utilisateur " + req.body.userMail + " existe déjà."
                this.router.navigateByUrl('errorPage', { state: { 'status': error.status, 'statusText': 'Duplicate entry', 'message': message } });
            } else {
                this.router.navigateByUrl('errorPage', { state: { 'status': error.status, 'statusText': error.statusText, 'message': "Unknown Error" } });
            }
        }
        return throwError(() => new Error('Something bad happened; please try again later.' + " " + this.errorToString(error)));
    }

    errorToString(error: { 'status': number, 'statusText': string, 'message': string }): string {
        return (error.status.toString + " " + error.statusText + " " + error.message);
    }
}