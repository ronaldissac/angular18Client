import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);

  // Only add Authorization header if the user is logged in
  if (authService.isLoggedIn()) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
      });
      return next(clonedReq);
  }
    return next(req);
}