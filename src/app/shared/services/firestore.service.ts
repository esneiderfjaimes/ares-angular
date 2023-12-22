import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { doc, onSnapshot } from 'firebase/firestore';
import {
  DocumentData,
  DocumentReference,
  Firestore,
  getDoc,
} from '@angular/fire/firestore';
import { UserData } from '../interfaces/user-data';

@Injectable({
  providedIn: 'root',
})
export class FirestoreService {
  docRef!: DocumentReference<DocumentData, DocumentData>;

  constructor(private firestore: Firestore, authService: AuthService) {
    console.log('hello from firestore');
    if (authService.userData === null || authService.userData === undefined) return;

   const userId = authService.userAuth?.uid;
   console.log('user id:'+ userId);

    console.log ('user id:'+ authService.userData.uid);
    this.docRef = doc(this.firestore, 'users', authService.userData.uid);
  }

  async getDoc() {
    console.log(this.docRef);
    const docSnap = await getDoc(this.docRef);
    if (docSnap.exists()) {
      console.log('Document data:', docSnap.data());
      const userData = docSnap.data() as UserData;
      console.log(userData);
      return userData;
    } else {
      // docSnap.data() will be undefined in this case
      console.log('No such document!');
      return null;
    }
  }
}
