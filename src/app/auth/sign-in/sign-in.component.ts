import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'amd-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit {
  signInForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  signIn() {
    this.authService
      .signIn(this.signInForm.value.username, this.signInForm.value.password)
      .then((userCredential: firebase.auth.UserCredential) => this.router.navigate(['scenario']));
  }
}
