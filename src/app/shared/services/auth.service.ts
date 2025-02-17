import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TOKEN_KEY } from '../constants';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http : HttpClient) {}

    createUser(formdata : any){
      // formdata.role = "Teacher"
      // formdata.gender = "Female"
      // formdata.age = 35
     return this.http.post(environment.apiBaseUrl+'/api/SignUp',formdata);
    }

    signin(formdata :any){
      return this.http.post(environment.apiBaseUrl+'/api/SignIn',formdata);
    }

    isLoggedIn() {
      return this.getToken() != null;
  }

    storeToken(token:string){
     return localStorage.setItem(TOKEN_KEY,token);
    }

   getToken(){
    return localStorage.getItem(TOKEN_KEY);
   }

    deleteToken(){
      return localStorage.removeItem(TOKEN_KEY);
    }

    getClaims(){
      const claim = JSON.parse(window.atob(this.getToken()!.split('.')[1]));

       return claim;
    }
} 
