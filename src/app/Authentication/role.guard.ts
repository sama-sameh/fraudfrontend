import { CanActivateFn, Router } from '@angular/router';
import { Observable, of } from 'rxjs';
import { inject } from '@angular/core';
import { AuthService } from './auth.service';

export const RoleGuard: CanActivateFn = (route, state): Observable<boolean> => {
  const router = inject(Router);
  const authService = inject(AuthService);

  if(authService.getCurrentAuthToken()){
    const role = route.data["role"] as string;
    if(role){
      const match = authService.isMatch(role);
      if(match){
        return of(true);
      }else{
        router.navigate(['/forbidden']);
        return of(false);
      }
    }
  }
  router.navigate(['/login']);
  return of(false);
};
