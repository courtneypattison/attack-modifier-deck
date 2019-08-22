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
  constructor(private actions$: Actions, private authService: AuthService, private router: Router) {}

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

  signUpSuccess$ = createEffect(() =>
    this.actions$.pipe(
      ofType(AuthActions.signUpSuccess),
      tap(() => this.router.navigate(['scenario']))
    ),
    { dispatch: false }
  );
}
