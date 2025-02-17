import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';
import { HideIfClaimsNotMetDirective } from '../../shared/directives/hide-if-claims-not-met.directive';
import { claimsReq } from '../../shared/utitils/claimReq';
import { roles } from '../../shared/properties/roles';
@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [HideIfClaimsNotMetDirective],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit {

  constructor(private router: Router,
            private services : AuthService,
            private userService : UserService){}
            fullName: string = ''

  ngOnInit(): void {
  
      this.userService.getUserProfile().subscribe({
        next:(res:any) =>{
         this.fullName = res.fullName;
        },
        error: (err:any) => console.log('error while retrieving user profile:\n',err)
      });
  }

  onLogout(){
        this.services.deleteToken();
        this.router.navigateByUrl('/login');
  }

  claimReq = claimsReq; 
  roles = roles

}
