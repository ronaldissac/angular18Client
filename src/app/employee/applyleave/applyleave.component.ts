import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserService } from '../../shared/services/user.service';
import { AuthService } from '../../shared/services/auth.service';
import { Router } from '@angular/router';
import { ReactiveFormsModule,FormGroup, FormBuilder, Validators, FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { NgxSpinnerService } from 'ngx-spinner';
import { ButtonModule } from 'primeng/button';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { DatePicker } from 'primeng/datepicker';


@Component({
  selector: 'app-applyleave',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule,ButtonModule,AutoCompleteModule,FormsModule,DatePicker],
  templateUrl: './applyleave.component.html',
  styleUrl: './applyleave.component.css'
})
export class ApplyleaveComponent implements OnInit {
  isSubmitted : boolean = false;
   form : FormGroup
  constructor(private service : AuthService,
    private router: Router,
    private toastr: ToastrService,
    private spinner : NgxSpinnerService,
    public formBuilder: FormBuilder,
    private userService : UserService,){
    this.form = formBuilder.group({
      fromDate:['',Validators.required,Validators.nullValidator,],
      toDate : ['',Validators.required,Validators.nullValidator,],
      reason :  ['',Validators.required,Validators.nullValidator,],
      leaveType :  ['',Validators.required,Validators.nullValidator,]
    })
  }


  value: string = ''; // The selected value
  items: string[] = []; // Suggestions list

  // Simulated search function
  search(event: any) {
    const query = event.query.toLowerCase();
    const allItems = ['Apple', 'Banana', 'Cherry', 'Date', 'Grapes', 'Mango', 'Orange', 'Pineapple', 'Strawberry'];

    // Filter items based on the query
    this.items = allItems.filter(item => item.toLowerCase().includes(query));
  }

  ngOnInit(): void {
    // if (this.service.isLoggedIn()) {
    //   this.router.navigateByUrl('/dashboard')
    // }
    // throw new Error('Method not implemented.');
  }


  onSubmit(){
    this.isSubmitted = true;

    console.log(this.form);
    
    if(this.form.valid){
      this.userService.submitLeaveReq().subscribe({
        next:(res:any) =>{
        },
        error: (err:any) => console.log('error while retrieving user profile:\n',err)
      });
    }
    this.spinner.show

  }


  hasDisplayableError(controlName : string): boolean{

    const control = this.form.get(controlName);

    return Boolean(control?.invalid) && 
    (this.isSubmitted || Boolean(control?.touched) || Boolean(control?.dirty))
  }

}
