import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user: Observable<firebase.User>;

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.user;
  }

  private addDomain(username: string): string {
    return username.concat('@amd.com');
  }

  getUserInitial(): Observable<string> {
    return this.angularFireAuth.user
      .pipe(map((user: firebase.User) => user.email[0]));
  }

  signIn(username: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(this.addDomain(username), password);
  }

  signUp(username: string, password: string): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.auth.createUserWithEmailAndPassword(this.addDomain(username), password);
  }

  signOut(): Promise<void> {
    return this.angularFireAuth.auth.signOut();
  }
}
