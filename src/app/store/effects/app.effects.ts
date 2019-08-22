import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

import { Actions, createEffect, ofType } from '@ngrx/effects';
import { from, of } from 'rxjs';
import { catchError, exhaustMap, map, tap } from 'rxjs/operators';

import { AuthService } from '../../auth/shared/auth.service';
import { Credentials } from '../../auth/shared/credentials.model';
import * as AuthActions from '../actions/auth.actions';

@Injectable()
export class AppEffects {
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
