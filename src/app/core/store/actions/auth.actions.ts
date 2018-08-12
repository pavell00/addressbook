import { Action } from '@ngrx/store';

export enum AuthActionTypes {
    LOGIN = '[Auth] Login',
    LOGIN_SUCCESS = '[Auth] Login Success',
    LOGIN_FAILURE = '[Auth] Login Failure',
    LOGOUT = '[Auth] Logout',
}

export class Login implements Action {
readonly type = AuthActionTypes.LOGIN;
constructor(public payload: any) {}
}

export class LogInSuccess implements Action {
readonly type = AuthActionTypes.LOGIN_SUCCESS;
constructor(public payload: any) {}
}

export class LogInFailure implements Action {
readonly type = AuthActionTypes.LOGIN_FAILURE;
constructor(public payload: any) {}
}

export class Logout implements Action {
readonly type = AuthActionTypes.LOGOUT;
}

export type AuthActions = Login|Logout|LogInSuccess|LogInFailure;