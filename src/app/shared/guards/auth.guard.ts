import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';

export const AuthGuard: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    authService.isLoggedIn || router.navigate(["login"]);

    return true;
  };

export const AuthGuardLogin: CanActivateFn = () => {
    const authService = inject(AuthService);
    const router = inject(Router);

    !authService.isLoggedIn || router.navigate(["dashboard"]);

    return true;
  };