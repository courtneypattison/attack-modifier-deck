import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../shared/auth.service';

@Component({
  selector: 'amd-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnInit {
  signUpForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required]
  });

  constructor(private authService: AuthService, private formBuilder: FormBuilder, private router: Router) { }

  ngOnInit() {
  }

  signUp() {
    this.authService
      .signUp(this.signUpForm.value.username, this.signUpForm.value.password)
      .then((userCredential: firebase.auth.UserCredential) => this.router.navigate(['scenario']));
  }
}
