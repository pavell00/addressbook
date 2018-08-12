import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Action } from '@ngrx/store';
import { Actions, Effect } from '@ngrx/effects';
import { Observable } from 'rxjs';
import { map, switchMap, throttle } from 'rxjs/operators';
import { tap } from 'rxjs/operators';

import { LocalStorageService } from '../../local-storage/local-storage.service';
import { DataService } from '../../services/data.service';

import { AUTH_KEY } from '../reducers/auth.reducer';
import { AuthActionTypes, Login, LogInFailure, LogInSuccess, Logout, AuthActions } from '../actions/auth.actions';

@Injectable()
export class AuthEffects {
  constructor(
    private actions$: Actions<Action>,
    private localStorageService: LocalStorageService,
    private router: Router,
    private dataService: DataService
  ) {}

  @Effect({ dispatch: false })
  login(): Observable<Action> {
    return this.actions$
      .ofType(AuthActionTypes.LOGIN)
      .pipe(
        tap((action: any) => {action.payload}),
        tap(action =>
          this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: true })
        ),
        map((action: any) => action.payload),
        switchMap(payload => {
          return this.dataService.logIn(payload.email, payload.password).pipe(
            tap((user) => {
              console.log(user);
            }))
            
              //return new LogInSuccess({token: user.token, email: payload.email});
            })
            /*.catch((error) => {
              console.log(error);
              return Observable.of(new LogInFailure({ error: error }));
            });*/
        );
  }
  
  
  @Effect({ dispatch: false })
  LogInSuccess(): Observable<any> { 
    return this.actions$
    .ofType(AuthActionTypes.LOGIN_SUCCESS)
    .pipe(
      tap((user) => {
        localStorage.setItem('token', user.payload.token);
        this.router.navigateByUrl('/addressbook');
      })
  );
}

@Effect({ dispatch: false })
LogInFailure(): Observable<any> {
  return this.actions$.ofType(AuthActionTypes.LOGIN_FAILURE);
}

/*  @Effect()
  LogIn: Observable<any> = this.actions$
    .ofType(AuthActionTypes.LOGIN)
    .map((action: LogIn) => action.payload)
    .switchMap(payload => {
      return this.authService.logIn(payload.email, payload.password)
        .map((user) => {
          console.log(user);
          return new LogInSuccess({token: user.token, email: payload.email});
        })
        .catch((error) => {
          console.log(error);
          return Observable.of(new LogInFailure({ error: error }));
        });
    });*/

  @Effect({ dispatch: false })
  logout(): Observable<Action> {
    return this.actions$.ofType(AuthActionTypes.LOGOUT).pipe(
      tap(action => {
        this.router.navigate(['']);
        this.localStorageService.setItem(AUTH_KEY, { isAuthenticated: false });
      })
    );
  }
}
