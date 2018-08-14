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
import { AuthActionTypes, LogIn, LogInFailure, LogInSuccess, LogOut, AuthActions } from '../actions/auth.actions';
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
      return this.dataService.logIn(payload.email, payload.password)
        .map((user) => {
          if (user.token) {
            return new LogInSuccess({token: user.token, email: payload.email});
          } else {
            throw(new Error('Authentication failed. Wrong password.'));
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

  /*@Effect({ dispatch: false })
  LogInFailure(): Observable<any> {
    return this.actions$.ofType(AuthActionTypes.LOGIN_FAILURE);
  }*/

  @Effect({ dispatch: false })
  LogInFailure: Observable<any> = this.actions$.pipe(
    ofType(AuthActionTypes.LOGIN_FAILURE)
    //,
    //tap(action => {this.router.navigate(['/login'])})
  )
  
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
