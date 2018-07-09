import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { Employee } from '../_models';

import {Observable} from 'rxjs';
import { pipe} from 'rxjs';
import { BehaviorSubject, Subject} from "rxjs";

//import "rxjs/add/operator/combineLatest";

@Injectable()
export class DataService {

  dataUrl = '../../../assets/all_AD_users.json';
  
  constructor(private http: HttpClient) { }

  getADUsers(): Observable<any[]> {
    //return this.http.get<Employee[]>(this.dataUrl);
    return this.http.get<any[]>(this.dataUrl)
      .pipe(
       
      )
  }

}