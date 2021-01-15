import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs';
import { UserService } from '../user.service';
import { SocialAuthService, GoogleLoginProvider, SocialUser } from 'angularx-social-login';
import { User } from 'src/app/model/User';

@Injectable()
export class AuthService {
    user: User;
    googleUser!: SocialUser;
    collect: any;
  private loggedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  private superAdmin: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  authUser = new BehaviorSubject<any>(null);

  get isLoggedIn() {
    return this.loggedIn.asObservable();
  }

  get isSuperAdmin(){
    return this.superAdmin.asObservable();
  }

  constructor(
    private router: Router,
    private authService: SocialAuthService,
    private userService: UserService
  ) {}

  signInWithGoogle(): void {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
    this.authService.authState.subscribe(user => {this.googleUser=user;
      if (this.googleUser!=null) {
        this.userService.getUserByEmail(this.googleUser.email).subscribe(response =>{
        if(response.message=="yes"){
          this.superAdmin.next((response.role === 1)?true:false);
          this.loggedIn.next(true);
          this.user = response;
          this.authUser.next(response);
          localStorage.setItem('id', JSON.stringify(this.user));
          this.router.navigate(['/admin-dashboard']);
          }else if(response.message=="no"){
            this.loggedIn.next(false);
            this.router.navigate(['/notpermitted']);
          }
      });
        }
    });
    
  }

  logout() {
    this.loggedIn.next(false);
    this.authUser.next(null);
    localStorage.removeItem("id");
    this.router.navigate(['/login']);
  }

  autoLogin() {
    const userData = localStorage.getItem('id');
    if (!userData) {
       this.authUser.next(null);
       return;
    }
    this.superAdmin.next( JSON.parse(userData).role === 1?true:false);
    this.loggedIn.next(true);
    this.authUser.next(userData);
   }
}