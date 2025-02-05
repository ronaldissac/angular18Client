import { Component } from '@angular/core';
import { RegistrationComponent } from "./registration/registration.component";
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { trigger,style,transition,query, animate } from '@angular/animations';

@Component({
  selector: 'app-user',
  standalone: true,
  imports: [RegistrationComponent,RouterOutlet],
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

  getRoutrUrl(){
     return this.context.getContext('primary')?.route?.url;
  }
}
