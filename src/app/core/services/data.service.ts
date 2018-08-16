import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../_models';

import {Observable} from 'rxjs';
import { pipe} from 'rxjs';
import { BehaviorSubject, Subject} from "rxjs";

import { User } from '../../shared/user';

//import "rxjs/add/operator/combineLatest";

@Injectable()
export class DataService {

  dataUrl = '../../../assets/all_AD_users.json';
  private BASE_URL = 'http://localhost:3000';
  
  constructor(private http: HttpClient) { }

  getToken(): string {
    return localStorage.getItem('token');
  }

  logIn(login: string, password: string): Observable<any> {
    const body = new HttpParams ()
      .set('login', login)
      .set('password', password);
    
    const url = `${this.BASE_URL}/login`;
    //return this.http.post<User>(url, {email, password});
    return this.http.post<User>(url, body.toString(), {
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }});
  }

  signUp(login: string, email: string, password: string): Observable<any> {
    const url = `${this.BASE_URL}/register`;
    return this.http.post<User>(url, {login, email, password});
  }

  getADUsers(): Observable<any[]> {
    //return this.http.get<Employee[]>(this.dataUrl);
    return this.http.get<any[]>(this.dataUrl)
      .pipe(
       
      )
  }

}