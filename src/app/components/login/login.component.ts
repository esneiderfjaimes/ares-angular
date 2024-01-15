import { Component } from '@angular/core';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
})
export class LoginComponent {
  constructor(private authService: AuthService, private router: Router) {
    console.log('hello from login');
    this.authService.userObservable.subscribe((user) => {
      console.log(LoginComponent.tag, 'user', user);
      if (user) {
        this.router.navigate(['/dashboard']);
      } else {
        console.log(LoginComponent.tag, 'nothing to do here');
      }
    });
  }

  logInWithGoogle() {
    this.authService.logInWithGoogleProvider();
  }

  static tag: string = 'logincomponenttag';
}
