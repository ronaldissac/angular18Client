import { Component } from '@angular/core';
import {Router ,RouterOutlet } from '@angular/router';
import { AuthService } from '../../shared/services/auth.service';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-main-layout',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css'
})
export class MainLayoutComponent {

  constructor(private router: Router,
            private services : AuthService,
            private userService : UserService){}
  onLogout(){
    this.services.deleteToken();
    this.router.navigateByUrl('/login');
}
}


