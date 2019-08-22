import { createAction, props } from '@ngrx/store';

import { Credentials } from '../../auth/shared/credentials.model';

export const signIn = createAction(
  '[Auth] Sign in',
  props<{ credentials: Credentials }>()
);

export const signInFailure = createAction(
  '[Auth] Sign in failure',
  (errorMessage = 'Error signing in') => ({ errorMessage })
);

export const signInSuccess = createAction(
  '[Auth] Sign in success',
  props<{ username: string }>()
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
