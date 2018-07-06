import { Component, OnInit } from '@angular/core';
import { LocalDataSource } from 'ng2-smart-table';
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';

@Component({
  selector: 'anms-addressbook',
  templateUrl: './addressbook.component.html',
  styleUrls: ['./addressbook.component.scss']
})
export class AddressbookComponent implements OnInit {
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
      perPage: 5
    },
    columns: {
      name: {
        title: 'Full Name',
        filter: false
      },
      phone: {
        title: 'Phone',
        filter: false
      },
      email: {
        title: 'Email',
        filter: false
      },
      isActive: {
        title: "Enable",
        filter: false
      }
    }
  }

  ngOnInit() {
    let a = [{name: "Poll Verhoven", phone: 1223003, email:"www@com", isActive:true, age: 45, address: 'sasasa'},
             {name: "Bill Gates", phone: 55888, email:"gares@com", isActive:false, age: 35, address: 'qwqwqwq'},
             {name: "Dart Veader", phone: 93128, email:"dart@com", isActive:true, age: 25, address: 'xzxzxzxz'},
             {name: "Joe Kokker", phone: 887445569, email:"joe@com", isActive:false, age: 70, address: 'fdfdfdf'},
             {name: "Freddy Kruger", phone: 534478, email:"freddy@com", isActive:true, age: 69, address: 'fgfgfgf'},
             {name: "Be Jeas", phone: 1234158, email:"bee@com", isActive:true, age: 55, address: 'jkjkjkj'},
             {name: "Tom Crouse", phone: 934682, email:"tom@com", isActive:true, age: 50, address: 'nbnbnbnb'}];
    this.source.load(a);
  }

  onSearch(query: string = '') {
    this.source.setFilter([
        // fields we want to include in the search
        {
        field: 'name',
        search: query
        },
        {
        field: 'phone',
        search: query
        },
        {
        field: 'email',
        search: query
        },
        {
        field: 'isActive',
        search: query
        }
    ], false); 
  }

  onSelectRow(e: any) {
    this.selectedItem = e.data;
}
}
