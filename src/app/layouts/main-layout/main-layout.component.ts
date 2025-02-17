import { Component,ChangeDetectionStrategy } from '@angular/core';
import {Router ,RouterOutlet,RouterLink } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimsReq } from '../../shared/utitils/claimReq';
import { roles } from '../../shared/properties/roles';
import { APP_NAME } from '../../shared/constants';
import { menu } from '../../shared/properties/menu';

import { NgxSpinnerModule, NgxSpinnerService, Spinner } from 'ngx-spinner';


@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet,RouterLink,HideIfClaimsNotMetDirective,NgxSpinnerModule],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MainLayoutComponent {
  constructor(private router: Router,
            private services : AuthService,
            private userService : UserService,
            private spinner : NgxSpinnerService
          ){}
          
    claimReq = claimsReq; 
    roles = roles;
    AppName = APP_NAME;
    navMenu = menu

 usermenu = {
  profile : "Profile",
  ChangePass : "Change password",
  logout : "logout",
}

ROUTERS ={
  DASHBOARD : '/dashboard',
  PROFILE: '/profile',

}

YEAR = new Date();
  onLogout(){
    this.spinner.show();
    this.services.deleteToken();
    this.router.navigateByUrl('/login');
    this.spinner.hide;
  }
}


