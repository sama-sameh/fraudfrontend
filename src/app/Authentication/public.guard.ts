import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const publicGuard: CanActivateFn = (): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if (!authService.getCurrentAuthToken()) {
    router.navigateByUrl('/login');
    return of(false);
  }
  return of(true);
}
