import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect, ofType } from '@ngrx/effects';
import { Observable } from 'rxjs';
//import { map, switchMap, throttle } from 'rxjs/operators';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/catch';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../local-storage/local-storage.service';
import { DataService } from '../../services/data.service';

import { AUTH_KEY } from '../reducers/auth.reducer';
import { APP_PREFIX } from '../../local-storage/local-storage.service';
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut, 
  SignUp, SignUpSuccess, SignUpFailure } from '../actions/auth.actions';
import { UIService } from '../../services/ui.service';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private dataService: DataService,
    private uiService: UIService
  ) {}

  @Effect()
  LogIn: Observable<any> = this.actions$
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.dataService.logIn(payload.username, payload.password)
        .map((user) => {
          if (user.token) {
            return new LogInSuccess({token: user.token, username: payload.username});
          } else {
            throw(new Error(user.message));
          }
        })
        .catch((error) => {
          //console.log(error);
          this.uiService.showShackBar(error, null, 2000);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });

  @Effect({ dispatch: false })
  LogInSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_SUCCESS),
    tap((user) => {
        localStorage.setItem(APP_PREFIX + 'TOKEN', user.payload.token);
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true });
        this.router.navigateByUrl('/addressbook');
    }
    ));

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
    //,tap(action => {this.router.navigate(['/login'])})
  )
  
  @Effect()
  SignUp: Observable<any> = this.actions$
    .ofType(AuthActionTypes.SIGNUP)
    .map((action: SignUp) => action.payload)
    .switchMap(payload => {
      return this.dataService.signUp(payload.username, payload.password)
        .map((result) => {
          if (result.success == true) {
            return new SignUpSuccess({token: user.token, username: payload.username});
          } else {
            throw(new Error(user));
          }
        })
        .catch((error) => {
          //console.log(error);
          this.uiService.showShackBar(error, null, 2000);
          return Observable.of(new SignUpFailure({ error: error }));
        });
  });
  
  @Effect({ dispatch: false })
  SignUpSuccess: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_SUCCESS),
    tap((user) => {
      localStorage.setItem('token', user.payload.token);
      this.router.navigateByUrl('/');
    })
  );

  @Effect({ dispatch: false })
  SignUpFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.SIGNUP_FAILURE)
  );

  @Effect({ dispatch: false })
  logOut(): Observable<Action> {
    return this.actions$.ofType(AuthActionTypes.LOGOUT).pipe(
      tap(action => {
        this.router.navigate(['/login']);
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
        this.localStorageService.deleteItem('TOKEN');
      })
    );
  }
}
