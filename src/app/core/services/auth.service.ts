import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { Observable, concatMap, tap } from 'rxjs';

@Injectable({
  providedIn: 'root'
})


export class AuthService {
  private token !: Token;
  //serverUrl = "http://localhost:8000/api/";
  serverUrl = "https://api.montictac.fr/api/";
  constructor(private http: HttpClient, private router : Router) { }

   

  getToken(): string | null {
    return localStorage.getItem('id_token') ;
  }

  getUserEmail(): string | null {
    return localStorage.getItem('userEmail');
  }

  
  login(email: string, password: string) : Observable<Token>{
    return this.http.post<Token>(this.serverUrl + 'login_check', new User(email,password)).pipe(
      tap(token => this.setSession(token, email))
      )
      //tap(() => this.router.navigateByUrl('')))
      //.subscribe();
  }

  createAccount(userMail: string, password: string): Observable<Object>{
    return this.http.post<Object>(this.serverUrl + 'user', {'userMail': userMail, 'password': password});
  
  }

  logout():void{
    localStorage.removeItem('id_token');
    localStorage.removeItem('userEmail');
  }


  private setSession(token: Token, email:string) :Token{
    localStorage.setItem('id_token', token.token );
    localStorage.setItem('userEmail', email);
    return token;
  }

}

