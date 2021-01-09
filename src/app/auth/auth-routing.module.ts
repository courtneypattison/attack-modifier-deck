import { NgModule } from '@angular/core';
import { AngularFireAuthGuard, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { RouterModule } from '@angular/router';

import { SignInComponent } from './components/sign-in/sign-in.component';
import { SignUpComponent } from './components/sign-up/sign-up.component';

const redirectLoggedInToScenario = () => redirectLoggedInTo(['scenario']);

const authRoutes = [
  { path: 'signup', component: SignUpComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToScenario } },
  { path: 'signin', component: SignInComponent, canActivate: [AngularFireAuthGuard], data: { authGuardPipe: redirectLoggedInToScenario } },
];

@NgModule({
  imports: [RouterModule.forChild(authRoutes)],
  exports: [RouterModule],
})
export class AuthRoutingModule { }
