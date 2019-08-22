import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { select, Store } from '@ngrx/store';

import { signUp } from '../../store/actions/auth.actions';
import * as fromStore from '../../store/reducers';
import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'amd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  errorMessage$ = this.store.pipe(select(fromStore.getErrorMessage));

  signUpForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(
    private authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router,
    private store: Store<fromStore.State>,
    ) { }

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
    // this.authService
    //   .signUp(this.signUpForm.value.username, this.signUpForm.value.password)
    //   .then((userCredential: firebase.auth.UserCredential) => this.router.navigate(['scenario']));
  }
}
