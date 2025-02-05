import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidatorFn, Validators } from '@angular/forms';
import { FirstkeyPipe } from '../../shared/pipes/firstkey.pipe';
import { AuthService } from '../../shared/services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Route, Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-registration',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,FirstkeyPipe,RouterLink],
  templateUrl: './registration.component.html',
  styleUrl: './registration.component.css'
})
export class RegistrationComponent implements OnInit {
  
  form: FormGroup;
  isSubmitted : boolean = false;
  constructor(public formBuilder: FormBuilder,
    private service: AuthService,
    private toastr: ToastrService,
    private router: Router
  ) {
    this.form = this.formBuilder.group({
      fullName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9]*[!@#$%^&*]+[a-zA-Z0-9]*$'),
        Validators.minLength(6),
      ]],
      confirmPassword: [''],
    }, { validators: this.passwordMatchValidator });
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

    if(this.form.valid){
      this.service.createUser(this.form.value)
      .subscribe({
        next:(res:any )=>{
          if(res.succeeded){
            this.form.reset();
            this.isSubmitted = false;
            this.toastr.success('New user created!', 'Registration Sucessful')
          }
        },
        error:err=>{
          console.log(err);
          if(err.error.errors){
             err.error.errors.forEach((x:any) => {
            switch(x.code){
             case "DuplicateUserName":
               this.toastr.error('UserName is already taken', 'Registration failed');
               break
             case "DuplicateEmail":
               this.toastr.error('Email is already taken', 'Registration failed');
               break
             default:
               this.toastr.error('Something went wrong','Registration failed');
               console.log(x);
               break
            }
           })
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
