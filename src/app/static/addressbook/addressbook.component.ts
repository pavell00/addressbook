import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { DataService } from '../../core/services/data.service';

@Component({
  selector: 'anms-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.scss']
})
export class AddressbookComponent implements OnInit {

  constructor(private dataService: DataService) {}

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
    /*let a = [{name: "Poll Verhoven", phone: 1223003, email:"www@com", isActive:true, age: 45, address: 'sasasa'},
             {name: "Bill Gates", phone: 55888, email:"gares@com", isActive:false, age: 35, address: 'qwqwqwq'},
             {name: "Dart Veader", phone: 93128, email:"dart@com", isActive:true, age: 25, address: 'xzxzxzxz'},
             {name: "Joe Kokker", phone: 887445569, email:"joe@com", isActive:false, age: 70, address: 'fdfdfdf'},
             {name: "Freddy Kruger", phone: 534478, email:"freddy@com", isActive:true, age: 69, address: 'fgfgfgf'},
             {name: "Be Jeas", phone: 1234158, email:"bee@com", isActive:true, age: 55, address: 'jkjkjkj'},
             {name: "Tom Crouse", phone: 934682, email:"tom@com", isActive:true, age: 50, address: 'nbnbnbnb'}];
             */
    this.showADUsersList();
    //this.source.load(a);
  }

  showADUsersList(){
    this.dataService.getADUsers().subscribe(
      data => {this.source = new LocalDataSource(data);}
    )
  }

  onSearch(query: string = '') {
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
}
