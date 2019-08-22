import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';

import { select, Store } from '@ngrx/store';

import { signUp } from '../../actions/auth.actions';
import * as fromAuth from '../../reducers';

@Component({
  selector: 'amd-sign-up',
  templateUrl: './sign-up.component.html',
})
export class SignUpComponent implements OnInit {
  errorMessage$ = this.store.pipe(select(fromAuth.getErrorMessage));

  signUpForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private formBuilder: FormBuilder, private store: Store<fromAuth.State>) { }

  ngOnInit() {
  }

  signUp() {
    this.store.dispatch(
      signUp({
        credentials: {
          username: this.signUpForm.value.username,
          password: this.signUpForm.value.password,
        }
      })
    );
  }
}
