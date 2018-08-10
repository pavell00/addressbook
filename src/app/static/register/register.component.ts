import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';

@Component({
    selector: 'anms-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    constructor() { }

    ngOnInit(): void { }

    onSubmit(form: NgForm) {
        console.log(form)
    }
}
