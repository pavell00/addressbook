import { Action } from '@ngrx/store';
import { User } from '../../../shared/user';
import { AuthActionTypes, AuthActions } from '../actions/auth.actions';

export const AUTH_KEY = 'AUTH';

export const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  errorMessage: null
};

export const selectorAuth = state => state.auth;

export function authReducer(
  state: AuthState = initialState,
  action: AuthActions
): AuthState {
  switch (action.type) {
    case AuthActionTypes.LOGIN:
      return { ...state, isAuthenticated: false };
    case AuthActionTypes.LOGIN_SUCCESS: {
      return {
        ...state,
        isAuthenticated: true,
        user: {
          token: action.payload.token,
          username: action.payload.username
        },
       // errorMessage: null
      };
    }
    case AuthActionTypes.LOGIN_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        //errorMessage: 'Incorrect email and/or password.'
      };
    }
    case AuthActionTypes.SIGNUP:
      return { ...state, 
        isAuthenticated: false,
      };
    case AuthActionTypes.SIGNUP_SUCCESS: {
      return {
        ...state,
        isAuthenticated: false,
        user: {
          token: action.payload.token,
          username: action.payload.username,
          email: action.payload.email
        },
        //rrorMessage: null
      };
    }
    case AuthActionTypes.SIGNUP_FAILURE: {
      return {
        ...state,
        isAuthenticated: false,
        //errorMessage: 'That email is already in use.'
      };
    }
    case AuthActionTypes.LOGOUT:
      //return { ...state, isAuthenticated: false };
      return initialState;

    default:
      return state;
  }
}

export interface AuthState {
  // is a user authenticated?
  isAuthenticated: boolean;
  // if authenticated, there should be a user object
  user: User | null;
  // error message
  errorMessage: string | null;
}
