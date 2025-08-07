import { inject } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from './auth.service';
import { catchError, switchMap, throwError } from 'rxjs';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const token = localStorage.getItem('access');
  const refreshToken = localStorage.getItem('refresh');

  const http = inject(HttpClient);
  const router = inject(Router);
  const authService = inject(AuthService);

  if (req.url.includes('/refresh')) {
    return next(req);

  }
  if (req.headers.get('No-Auth') === 'True') {
    return next(req);
  }

  const authReq = token
    ? req.clone({ setHeaders: { Authorization: `Bearer ${token}` } })
    : req;

  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401 && refreshToken) {
        return authService.refreshToken(refreshToken).pipe(
          switchMap(response => {

            localStorage.setItem('access', response.token);
            localStorage.setItem('refresh', response.refreshToken);

            // Retry original request with new token
            const retryReq: HttpRequest<any> = authReq.clone({
              setHeaders: {
                Authorization: `Bearer ${response.token}`
              }
            });
            return next(retryReq);
          }),
          catchError(refreshError => {
            console.log("refreshError", refreshError);
            authService.logout();
            return throwError(() => refreshError);
          })
        );
      } else if (error.status === 403) {
        router.navigate(['/forbidden']);
      }

      // If not 401 or no refresh token — propagate error
      return throwError(() => error);
    })
  );
};
