import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from './services/auth.service';
import { tap } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const toastr = inject(ToastrService);
  const router = inject(Router);
  const spinner = inject(NgxSpinnerService);

  // Only add Authorization header if the user is logged in
  spinner.show
  if (authService.isLoggedIn()) {
      const clonedReq = req.clone({
        headers: req.headers.set('Authorization', 'Bearer ' + authService.getToken())
      });
      return next(clonedReq).pipe(
        tap({
          error: (err:any) => {
            if(err.status ==401){
              authService.deleteToken();
              setTimeout(()=>{
                toastr.info('please login again');
              },1500);
              router.navigateByUrl('/signin');
            }
            else if(err.status == 403){
              authService.deleteToken();
              setTimeout(()=>{
                toastr.info("Oops! you're not authorized to perform the action");
              },1500);
            }
          }
        })
      );
  }
    return next(req);
}