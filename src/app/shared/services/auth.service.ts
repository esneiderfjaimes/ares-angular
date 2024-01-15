import { Injectable } from '@angular/core';
import { GoogleAuthProvider } from '@angular/fire/auth';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import firebase from 'firebase/compat/app';
import { User } from '../interfaces/user';
import { Subject } from 'rxjs';
import { FirestoreService } from './firestore.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private userSubject = new Subject<User | null>();

  get userObservable() {
    return this.userSubject.asObservable();
  }

  constructor(
    private fireAuth: AngularFireAuth,
    private firebaseService: FirestoreService
  ) {
    AuthService.count++;
    console.log('AuthService constructor count:', AuthService.count);

    // OBSERVER save user in localStorage (log-in) and setting up null when log-out
    this.fireAuth.authState.subscribe(async (userAuth) => {
      console.log('AuthService authState', userAuth);
      this.userSubject.next(await this.proccessUser(userAuth));
    });
  }

  private async proccessUser(
    userAuth: firebase.User | null
  ): Promise<User | null> {
    if (userAuth) {
      const userLocalStorage = this.getUserLocalStorage();
      if (userLocalStorage) {
        return userLocalStorage;
      }

      const userData = await this.firebaseService.getUserDocument(userAuth.uid);
      if (userData) {
        const user = {
          id: userAuth.uid,
          email: userAuth.email ?? 'N/A',
          imageUrl: userAuth.photoURL,
          name: userAuth.displayName ?? 'Anonymous',
          isAdmin: userData.isAdmin,
        };

        localStorage.setItem('user', JSON.stringify(user));
        this.userSubject.next(user);
      }

      return {
        id: userAuth.uid,
        email: userAuth.email ?? 'N/A',
        imageUrl: userAuth.photoURL,
        name: userAuth.displayName ?? 'Anonymous',
        isAdmin: false, // HERE HARDCODE
      };
    } else {
      localStorage.setItem('user', 'null');
      return null;
    }
  }

  private getUserLocalStorage(): User | null {
    const userItem = localStorage.getItem('user');
    if (userItem === null) return null;
    return JSON.parse(userItem);
  }

  // log-in with google
  logInWithGoogleProvider() {
    this.fireAuth
      .signInWithPopup(new GoogleAuthProvider())
      .catch((error: Error) => {
        alert(error.message);
      });
  }

  // return true when user is logged in
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null;
  }

  // logOut
  logOut() {
    this.fireAuth.signOut();
  }

  static count: number = 0;
}
