import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import {Observable} from 'rxjs';

import { User } from '../../shared/user';
import { environment as env } from '@env/environment';

@Injectable()
export class AuthService {

  private BASE_URL = env.authServiceHost;
  
  constructor(private http: HttpClient) { }

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

}