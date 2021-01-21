import { Component } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { Router } from "@angular/router";

import { AuthService } from "../../shared/auth.service";

@Component({
  selector: "amd-sign-in",
  templateUrl: "./sign-in.component.html",
})
export class SignInComponent {
  errorMessage = "";
  signInForm = this.formBuilder.group({
    username: [null, Validators.required],
    password: [null, Validators.required],
  });

  constructor(
    public authService: AuthService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  signIn() {
    this.authService
      .signIn({
        username: this.signInForm.value.username,
        password: this.signInForm.value.password,
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
