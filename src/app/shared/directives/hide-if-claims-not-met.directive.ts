import { Directive, Input,OnInit,ElementRef } from '@angular/core';
import { AuthService } from '../services/auth.service';


@Directive({
  selector: '[appHideIfClaimsNotMet]',
  standalone: true
})
export class HideIfClaimsNotMetDirective implements OnInit {
  @Input("appHideIfClaimsNotMet") claimReq! : Function;

  constructor(
    private authService: AuthService,
    private elementref : ElementRef
  ) { }
  ngOnInit(): void {

    const claims = this.authService.getClaims();
    if(!this.claimReq(claims)){
      this.elementref.nativeElement.style.display = "none";
    }
  }

}
