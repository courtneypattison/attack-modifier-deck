import { createAction, props } from '@ngrx/store';

import { Credentials } from '../models/credentials.model';

export const signIn = createAction(
  '[Auth] Sign in',
  props<{ credentials: Credentials }>()
);

export const signInFailure = createAction(
  '[Auth] Sign in failure',
  props<{ errorMessage: string }>()
);

export const signInSuccess = createAction(
  '[Auth] Sign in success',
  props<{ username: string }>()
);

export const signOut = createAction(
  '[Auth] Sign out',
);

export const signOutFailure = createAction(
  '[Auth] Sign out failure',
  props<{ errorMessage: string }>()
);

export const signOutSuccess = createAction(
  '[Auth] Sign out success',
);

export const signUp = createAction(
  '[Auth] Sign up',
  props<{ credentials: Credentials }>()
);

export const signUpFailure = createAction(
  '[Auth] Sign up failure',
  props<{ errorMessage: string }>()
);

export const signUpSuccess = createAction(
  '[Auth] Sign up success',
  props<{ username: string }>()
);
