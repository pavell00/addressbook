import * as auth from './auth.reducer';

export interface AppState {
    authState: auth.AuthState;
}