import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import * as AuthActions from '../actions/auth.actions';
import { Credentials } from '../models/credentials.model';
import { AuthService } from '../services/auth.service';

@Injectable()
export class AuthEffects {
  constructor(private actions$: Actions, private authService: AuthService) {}

  signUp$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUp),
      map(action => action.credentials),
      exhaustMap((credentials: Credentials) =>
        from(this.authService.signUp(credentials)).pipe(
          map((userCredential: firebase.auth.UserCredential) => AuthActions.signUpSuccess({ username: userCredential.user.email })),
          catchError((error: firebase.auth.Error) => of(AuthActions.signUpFailure({ errorMessage: error.message })))
        )
      )
    )
  );

  signIn$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signIn),
      map(action => action.credentials),
      exhaustMap((credentials: Credentials) =>
        from(this.authService.signIn(credentials)).pipe(
          map((userCredential: firebase.auth.UserCredential) => AuthActions.signInSuccess({ username: userCredential.user.email })),
          catchError((error: firebase.auth.Error) => of(AuthActions.signInFailure({ errorMessage: error.message })))
        )
      )
    )
  );

  signOut$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signOut),
      exhaustMap(() =>
        from(this.authService.signOut()).pipe(
          map(() => AuthActions.signOutSuccess()),
          catchError((error: firebase.auth.Error) => of(AuthActions.signOutFailure({ errorMessage: error.message })))
        )
      )
    )
  );
}
