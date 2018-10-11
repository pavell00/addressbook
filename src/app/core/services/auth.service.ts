import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';
import { JwtHelper } from 'angular2-jwt';

import { User } from '../../shared/user';
import { environment as env } from '@env/environment';
import { Store } from '@ngrx/store';
import { LogOut } from '@app/core';

@Injectable()
export class AuthService {

  private BASE_URL = env.authServiceHost;
  jwtHelper: JwtHelper = new JwtHelper();
  
  constructor(private http: HttpClient, private store: Store<any>) { }

  getToken(): string {
    return localStorage.getItem('ANMS-TOKEN');
  }

  logIn(login: string, password: string): Observable<any> {
    const body = new HttpParams ()
      .set('login', login)
      .set('password', password);
    
    const url = `${this.BASE_URL}/login`;
    return this.http.post<User>(url, {login, password});
    /*return this.http.post<User>(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});*/
  }

  signUp(login: string, email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {login, email, password});
  }

  isTokenExpired() {
    //console.log(this.getToken());
    if (this.getToken() !== 'undefined' && this.getToken() !== null) {
      var objToken = JSON.parse(this.getToken());
      return this.jwtHelper.isTokenExpired(objToken.token);
    }
    this.store.dispatch(new LogOut());
    return true;
  }

}