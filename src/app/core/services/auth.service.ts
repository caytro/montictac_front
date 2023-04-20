import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Token } from '../models/token.model';
import { User } from '../models/user.model';
import { tap } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private token !: Token;
  
  constructor(private http: HttpClient, private router : Router) { }

  getToken(): string | null {
    return localStorage.getItem('id_token') ;
  }

  
  login(email: string, password: string) : void{
    this.http.post<Token>('http://localhost:8000/api/login_check', new User(email,password)).pipe(
      tap(token => this.setSession(token)),
      tap(() => this.router.navigateByUrl('')))
      .subscribe();
  }

  logout():void{
    localStorage.removeItem('id_token');
  }

  private setSession(token: Token) :Token{
    localStorage.setItem('id_token', token.token);
    return token;
  }

}

