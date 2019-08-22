import { Action, createReducer, on } from '@ngrx/store';

import * as AuthActions from '../actions/auth.actions';

export const authFeatureKey = 'auth';

export interface State {
  username: string | null;
  errorMessage: string | null;
}

export const initialState: State = {
  username: null,
  errorMessage: null,
};

const authReducer = createReducer(
  initialState,

  on(AuthActions.signIn, (state) => ({ ...state, errorMessage: null })),
  on(AuthActions.signInFailure, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(AuthActions.signInSuccess, (state, { username }) => ({ ...state, username, errorMessage: null })),

  on(AuthActions.signOut, (state) => ({ ...state, errorMessage: null })),
  on(AuthActions.signOutFailure, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(AuthActions.signOutSuccess, () => (initialState)),

  on(AuthActions.signUp, (state) => ({ ...state, errorMessage: null })),
  on(AuthActions.signUpFailure, (state, { errorMessage }) => ({ ...state, errorMessage })),
  on(AuthActions.signUpSuccess, (state, { username }) => ({ ...state, username, errorMessage: null })),
);

export function reducer(state: State | undefined, action: Action) {
  return authReducer(state, action);
}

export const getErrorMessage = (state: State) => state.errorMessage;
export const getUsername = (state: State) => state.username;
