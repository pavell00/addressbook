import { Component, OnInit, OnDestroy } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { DataService } from '../../core/services/data.service';
import { AuthService } from '../../core/services/auth.service';
import {Subject} from "rxjs/Subject";
import 'rxjs/add/operator/takeUntil';
import { Store } from '@ngrx/store';
import { LogOut } from '@app/core';

@Component({
  selector: 'anms-employeebook',
  templateUrl: './employeebook.component.html',
  styleUrls: ['./employeebook.component.scss']
})
export class EmployeebookComponent implements OnInit {

  componentDestroyed$: Subject<boolean> = new Subject();//for unsubscribe observers
  constructor(private dataService: DataService, private auth: AuthService, private store: Store<any>) {}

  routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
  versions = env.versions;
  source = new LocalDataSource();
  selectedItem: any;

  settings = {
    actions: {
        add: false,
        edit: false,
        delete: false
    },
    pager: {
      display: true,
      perPage: 10
    },
    columns: {
      Name: {
        title: 'Name',
        filter: false
      },
      MobilePhone: {
        title: 'Phone',
        filter: false
      },
      Office: {
        title: 'Office',
        filter: false
      },
      Title: {
        title: "Title",
        filter: false
      },
      EmailAddress: {
        title: "Email",
        filter: false
      }
    }
  }

  ngOnInit() {
    this.showADUsersList();
    //this.source.load(a);
  }

  showADUsersList(){
    this.dataService.getADUsers()
    .takeUntil(this.componentDestroyed$)
    .subscribe(
      data => {this.source = new LocalDataSource(data);}
    )
  }

  onSearch(query: string = '') {
    this.checkToken();
    this.source.setFilter([
        // fields we want to include in the search
        {
          field: 'Name',
          search: query
        },
        {
          field: 'MobilePhone',
          search: query
        },
        {
          field: 'Office',
          search: query
        },
        {
          field: 'Title',
          search: query
        },
        {
          field: 'EmailAddress',
          search: query
        }
    ], false); 
  }

  onSelectRow(e: any) {
    this.selectedItem = e.data;
  }

  ngOnDestroy() {
      this.componentDestroyed$.next(true);
      this.componentDestroyed$.complete();
  }

  checkToken() {
    //console.log(this.auth.isTokenExpired())
    if (this.auth.isTokenExpired()) {
      this.store.dispatch(new LogOut());
    }
  }
}
