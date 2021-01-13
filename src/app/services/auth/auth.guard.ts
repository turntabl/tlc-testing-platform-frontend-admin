import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { map, take } from 'rxjs/operators';

import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(next: ActivatedRouteSnapshot, state: RouterStateSnapshot){
    this.authService.autoLogin();
    return this.authService.authUser.pipe(take(1), map(user => {
      const isAuth = !!user;
      if (!isAuth) {
        this.router.navigate(['/login']);
        return false;
      }
      return true;
  }));
  }
}