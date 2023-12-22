import { Injectable, NgZone } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import firebase from 'firebase/compat/app';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  userData: firebase.User | null = null;

  constructor(
    private fireAuth: AngularFireAuth,
    private router: Router,
    private ngZone: NgZone
  ) {
    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    this.fireAuth.authState.subscribe((user) => {
      if (user) {
        this.userData = user;
        localStorage.setItem('user', JSON.stringify(this.userData));
      } else {
        localStorage.setItem('user', 'null');
      }
    });
  }

  // log-in with google
  logInWithGoogleProvider() {
    return this.fireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .then(() => this.observeUserState())
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  observeUserState() {
    this.fireAuth.authState.subscribe((userState) => {
      userState && this.ngZone.run(() => this.router.navigate(['dashboard']));
    });
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  get userAuth(): firebase.User | null {
    return JSON.parse(localStorage.getItem('user')!);
  }

  get user(): User | null {
    if (this.userAuth === null) return null;
    return {
      id: this.userAuth.uid,
      imageUrl: this.userAuth.photoURL,
      email: this.userAuth.email || 'N/A',
      name: this.userAuth.displayName || 'N/A',
      loans: [],
    };
  }

  // logOut
  logOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['login']);
    });
  }
}
