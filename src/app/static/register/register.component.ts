import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { User } from '../../shared';

@Component({
    selector: 'anms-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
    user: User = new User();

    constructor() { }

    ngOnInit(): void { }

    onSubmit(form: NgForm) {
        //console.log(form)
        this.user = {username: form.value.username,
            password: form.value.password,
            email: form.value.email
        }
    }
}
