import { Component } from '@angular/core';
import { APP_NAME } from '../shared/constants';
import { RegistrationComponent } from "./registration/registration.component";
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { trigger,style,transition,query, animate } from '@angular/animations';
@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './user.component.html',
  styleUrl: './user.component.css',
  animations: [
    trigger('routerFadeIn',[
      transition('*<=>*',[
        query(':enter',[
          style({opacity:0}),
          animate('1s ease-in-out',style({opacity:1}))
        ], {optional:true}),
      ])
    ])
  ]
})
export class UserComponent {

  constructor(private context: ChildrenOutletContexts){}

  appname = APP_NAME;
  getRoutrUrl(){
     return this.context.getContext('primary')?.route?.url;
  }
}
