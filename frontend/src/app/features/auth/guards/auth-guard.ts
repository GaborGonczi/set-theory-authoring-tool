import { inject } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivateFn, Router, RouterStateSnapshot } from '@angular/router';
import { Auth } from '@src/app/features/auth/services/auth';

export const authGuard: CanActivateFn = (route: ActivatedRouteSnapshot,state: RouterStateSnapshot) => {
  const auth = inject(Auth);
  const router = inject(Router);
  return auth.isAuthenticated()?true:router.createUrlTree(['/login']);
};
