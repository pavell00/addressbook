import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse, HttpParams } from '@angular/common/http';
import { Employee } from '../models/employee';

import {Observable, Subject, of, forkJoin} from 'rxjs';
import { tap,  flatMap } from 'rxjs/operators';

import { User } from '../../shared/user';

//import "rxjs/add/operator/combineLatest";

@Injectable()
export class DataService {

  dataUrl = '../../../assets/all_AD_users.json';
  private BASE_URL = 'http://localhost:3000';
  empl: Subject<Employee[]> = new Subject<Employee[]>();
  
  constructor(private http: HttpClient) { }

  getADUsers(): Observable<any[]> {
    //return this.http.get<Employee[]>(this.dataUrl);
    return this.http.get<User[]>(this.dataUrl)
      .pipe(
       
      )
  }

  getADUsersJSONfile(str: string){
    let one = of(this.http.get<Employee[]>(this.dataUrl));

    let arr:Employee[] = [];
    this.empl.next(arr);
    forkJoin(
      one.pipe(
        //tap(r=>console.log(r)),
        flatMap(r=> r),
        tap(w => {w.forEach(element => {
              if (element.Name.toLowerCase().includes(str)) {
                arr.push(element);
              }
            });
          })
      ),
      one.pipe(
        flatMap(r=> r),
        //filter(w => w.MobilePhone !== null),
        //filter(q=> q.MobilePhone.includes('+'))
        tap(w => {w.forEach(element => {
          if (element.MobilePhone != null && element.MobilePhone.includes(str)) {
            arr.push(element);
            //console.log(this.arr);
          }
        });
      })
      ),
      one.pipe(
        flatMap(r=> r),
        tap(w => {w.forEach(element => {
          if (element.EmailAddress != null && element.EmailAddress.includes(str)) {
            arr.push(element);
          }
        });
      })
      )
      ).subscribe(a=> {
      //console.log(JSON.stringify(a));
      this.empl.next(arr);
      //console.log(this.arr);
    })
  }

}