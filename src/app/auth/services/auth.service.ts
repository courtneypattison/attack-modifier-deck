import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { Credentials } from '../models/credentials.model';

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

  signIn(credentials: Credentials): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(this.addDomain(credentials.username), credentials.password);
  }

  signUp(credentials): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(this.addDomain(credentials.username), credentials.password);
  }

  signOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
