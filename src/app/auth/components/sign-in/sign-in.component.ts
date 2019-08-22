import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { signIn } from '../../actions/auth.actions';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'amd-sign-in',
  templateUrl: './sign-in.component.html',
})
export class SignInComponent implements OnInit {
  errorMessage$ = this.store.pipe(select(fromAuth.getErrorMessage));

  signInForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private store: Store<fromAuth.State>) { }

  ngOnInit() {
  }

  signIn() {
    this.store.dispatch(
      signIn({
        credentials: {
          username: this.signInForm.value.username,
          password: this.signInForm.value.password,
        }
      })
    );
  }
}
