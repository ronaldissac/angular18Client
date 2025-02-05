import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [],
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

}
