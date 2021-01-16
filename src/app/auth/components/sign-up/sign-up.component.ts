import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../services/auth.service";

@Component({
  selector: "amd-sign-up",
  templateUrl: "./sign-up.component.html",
})
export class SignUpComponent implements OnInit {
  errorMessage = "";
  signUpForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit() {}

  signUp() {
    this.authService
      .signUp({
        username: this.signUpForm.value.username,
        password: this.signUpForm.value.password,
      })
      .then(() => this.router.navigate(["/scenario"]))
      .catch(
        (error: Error) =>
          (this.errorMessage = error.message.replace(
            "email address",
            "username"
          ))
      );
  }
}
