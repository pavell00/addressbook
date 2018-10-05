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

  getADUsers(): Observable<any[]> {
    //return this.http.get<Employee[]>(this.dataUrl);
    return this.http.get<User[]>(this.dataUrl)
      .pipe(
       
      )
  }

}