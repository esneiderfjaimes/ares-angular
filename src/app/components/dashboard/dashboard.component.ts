import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { FirestoreService } from '../../shared/services/firestore.service';
import { User } from '../../shared/interfaces/user';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent {
  user: User | null | undefined;

  constructor(
    private authService: AuthService,
    private firestoreService: FirestoreService
  ) {
    this.user = this.authService.user;

    console.log('hello from dashboard');
    this.firestoreService
      .getDoc()
      .then((data) => console.log(data))
      .catch((error) => {
        console.log('error in dashboard');
        console.log(error);
      });
    console.log('end of dashboard');
  }

  logOut() {
    console.log('log out clicked');
    this.authService.logOut();
  }
}
