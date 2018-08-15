import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators , NgForm} from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from '../../core/services/data.service';
import {Subject} from "rxjs/Subject";
import { environment as env } from '@env/environment';
import { ROUTE_ANIMATIONS_ELEMENTS } from '@app/core';
import { Store } from '@ngrx/store';
import {
    LogIn,
    LogOut,
    AnimationsService,
    selectorAuth,
    routeAnimations
  } from '@app/core';
import { User } from '../../shared';

@Component({
    selector: 'anms-login',
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
    
    routeAnimationsElements = ROUTE_ANIMATIONS_ELEMENTS;
    versions = env.versions;
    componentDestroyed$: Subject<boolean> = new Subject();//for unsubscribe observers

    loginForm: FormGroup;
    loading = false;
    submitted = false;
    returnUrl: string;

    username: string;
    password: string;
    showSpinner: boolean = false;
    user: User = new User();

    constructor(
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private store: Store<any>,
        //private authenticationService: AuthenticationService,
        //private alertService: AlertService
    ) { }

    ngOnInit(): void {
        // reset login status
        //this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || 'login';
    }

    // convenience getter for easy access to form fields
    //get f() { return this.loginForm.controls; }
    
    onSubmit(form: NgForm) {
        //console.log(form);
        const payload = {
            username: form.value.username,
            password: form.value.password
        };
        /*this.user = {username: form.value.username,
                    password: form.value.password
        }*/
        //console.log(this.user);
        this.store.dispatch(new LogIn(payload));
        //this.router.navigateByUrl('addressbook');
    }
}
