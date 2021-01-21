import { Injectable } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";

import { BehaviorSubject, Observable } from "rxjs";
import { map } from "rxjs/operators";

import { Credentials } from "./credentials.model";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  errorMessage: Observable<string> = new Observable<string>(null);
  user: Observable<firebase.User>;
  userBS: BehaviorSubject<firebase.User> = new BehaviorSubject<firebase.User>(null);

  constructor(private angularFireAuth: AngularFireAuth) {
    this.user = angularFireAuth.user;
    angularFireAuth.user.subscribe(this.userBS);
  }

  private addDomain(username: string): string {
    return username.concat("@amd.com");
  }

  getUserInitial(): Observable<string> {
    return this.angularFireAuth.user.pipe(
      map((user: firebase.User) => user.email[0])
    );
  }

  getUID(): string {
    return this.userBS.getValue().uid;
  }

  signIn(credentials: Credentials): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.signInWithEmailAndPassword(
      this.addDomain(credentials.username),
      credentials.password
    );
  }

  signUp(credentials: Credentials): Promise<firebase.auth.UserCredential> {
    return this.angularFireAuth.createUserWithEmailAndPassword(
      this.addDomain(credentials.username),
      credentials.password
    );
  }

  signOut(): Promise<void> {
    return this.angularFireAuth.signOut();
  }
}
