import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SocialAuthService, GoogleLoginProvider } from 'angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AuthenticateService {
  collect:any;
  id:any;
  constructor( private authService: SocialAuthService, private http:HttpClient, private router: Router ) { }


  signout(): void {
    this.authService.signOut();
    localStorage.removeItem("id");
    this.router.navigate(['/login']);
  }

  checkLogin(){
    if (localStorage.getItem("id")!=null) {
      this.collect = localStorage.getItem("id");
      //this.id = JSON.parse(this.collect).user_id;
      return JSON.parse(this.collect).user_id;
    }
  }

  checkLoginState() {
    if (localStorage.getItem('id') == null) {
      this.router.navigate(['/login']);
    }
  }

  isLogin(): boolean{
    if ( localStorage.getItem("id")!=null ) {
      return true;
    }else{
    return false;
    }
  }

  notLogin(){
    if (this.checkLogin()==null) {
      this.router.navigate(['/login']);
    }
  }

}
