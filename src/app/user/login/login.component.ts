import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { RouterLink,Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  isSubmitted : boolean = false;
  constructor(public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private router : Router
  ) {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required]],
      password: ['',Validators.required],
    })
  }

ngOnInit(): void {
    if(this.service.isLoggedIn()){
      this.router.navigateByUrl('/dashboard')
    }
}

  passwordMatchValidator: ValidatorFn = (control: AbstractControl): null => {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');

    if (password && confirmPassword && password.value !== confirmPassword.value) {
      confirmPassword?.setErrors({ passwordMismatch: true });
    } else {
      confirmPassword?.setErrors(null);
    }
      return null;
  }

  onSubmit(){

    this.isSubmitted = true;
    this.form.markAllAsTouched();

    if(this.form.valid){

      this.service.signin(this.form.value)
      .subscribe({
        next:(res:any )=>{
          this.service.storeToken(res.token);
          this.router.navigateByUrl('/dashboard');
          
        },
        error:err=>{
          console.log(err);
          if(err.status == 400){
             this.toastr.error('Incorrect email or password.','Login failed')
          }
          else{
            console.log("error",err);
          }
         
        }
      });
    }
    
  }

  hasDisplayableError(controlName : string): boolean{

    const control = this.form.get(controlName);

    return Boolean(control?.invalid) && 
    (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }
}
