import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';

import { SharedModule } from '../shared/shared.module';
import { AuthRoutingModule } from './auth-routing.module';
import { AuthGuardService } from './shared/auth-guard.service';
import { AuthService } from './shared/auth.service';
import { SignInComponent } from './sign-in/sign-in.component';
import { SignUpComponent } from './sign-up/sign-up.component';

@NgModule({
  declarations: [SignInComponent, SignUpComponent],
  imports: [
    CommonModule,
    AuthRoutingModule,
    ReactiveFormsModule,
    SharedModule,
  ],
  providers: [
    AuthGuardService,
    AuthService,
  ]
})
export class AuthModule { }
