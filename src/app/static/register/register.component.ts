import { Component, OnInit } from '@angular/core';
import { NgForm, FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { SignUp } from '../../core/store/actions/auth.actions';
import { ConfirmValidParentMatcher, errorMessages, CustomValidators, regExps } from './CustomValidators';

@Component({
    selector: 'anms-register',
    templateUrl: './register.component.html',
    styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {

    pas: string;
    pasConfirm: string;
    isMatch: boolean;// = false;

    userRegistrationForm: FormGroup;
     confirmValidParentMatcher = new ConfirmValidParentMatcher();
     errors = errorMessages;

    constructor(private store: Store<any>, private formBuilder: FormBuilder) { }

    ngOnInit(): void {this.createForm();}

    createForm() {
        this.userRegistrationForm = this.formBuilder.group({
            fullName: ['', [
                Validators.required,
                Validators.minLength(3),
                Validators.maxLength(50)
            ]],
            emailGroup: this.formBuilder.group({
                email: ['', [
                    Validators.required,
                    Validators.email
                ]],
                confirmEmail: ['', Validators.required]
            }, { validator: CustomValidators.childrenEqual}),
            passwordGroup: this.formBuilder.group({
                password: ['', [
                    Validators.required,
                    Validators.pattern(regExps.password)
                ]],
                confirmPassword: ['', Validators.required]
            }, { validator: CustomValidators.childrenEqual})
        });
    }

    //onSubmit(form: NgForm) {
    onSubmit() {        
        //console.log(this.userRegistrationForm.value.fullName);
        //console.log(this.userRegistrationForm.value.emailGroup.email);
        //console.log(this.userRegistrationForm.value.passwordGroup.password);
        const payload = {
            username: this.userRegistrationForm.value.fullName,
            email: this.userRegistrationForm.value.emailGroup.email,
            password: this.userRegistrationForm.value.passwordGroup.password
        }
        this.store.dispatch(new SignUp(payload))
    }

    checkMatch() {
        if ((this.pas? this.pas.length : 0 !==0) && (this.pasConfirm ? this.pasConfirm.length : 0 !== 0)) {
            //console.log('pas ' + this.pas, 'pasConfirm ' + this.pasConfirm);
            //console.log(this.pas === this.pasConfirm);
            this.isMatch = this.pas === this.pasConfirm
        }
    }
}
