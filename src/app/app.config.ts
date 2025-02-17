import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideToastr, ToastrModule } from 'ngx-toastr';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { authInterceptor } from './shared/auth.interceptor';
import { NgxSpinnerModule } from "ngx-spinner";
import { providePrimeNG } from 'primeng/config';
import Lara from "@primeng/themes/lara";
import { MyPreset } from '../mypresent';
import Aura from '@primeng/themes/aura';

export const appConfig: ApplicationConfig = {
  providers: [provideZoneChangeDetection({ eventCoalescing: true }), provideRouter(routes), 
    provideHttpClient(withInterceptors([authInterceptor])),
    provideAnimationsAsync(),
    provideToastr({positionClass:'toast-top-right'}),
    importProvidersFrom(
      ToastrModule.forRoot({
        timeOut :5000,
        positionClass: 'toast-top-right',
        preventDuplicates:true,
      }),
      NgxSpinnerModule.forRoot({
        type :'ball-scale-multiple'
      }) 
    ),
      providePrimeNG({
        theme: Aura
    })
],

};
