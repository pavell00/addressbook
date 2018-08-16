import { Component, OnInit } from '@angular/core';
import {NgForm} from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignUp } from '../../core/store/actions/auth.actions';

@Component({
    selector: 'anms-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    constructor(private store: Store<any>) { }

    ngOnInit(): void { }

    onSubmit(form: NgForm) {
        //console.log(form)
        const payload = {
            username: form.value.username,
            email: form.value.email,
            password: form.value.password
        }
        this.store.dispatch(new SignUp(payload))
    }
}
