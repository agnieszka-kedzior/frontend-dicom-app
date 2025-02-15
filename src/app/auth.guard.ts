import { Injectable } from '@angular/core';
import { CanActivate, Router} from '@angular/router';
import {AppAuthService} from './app-auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AppAuthService, private router: Router) {

  }

  canActivate(): boolean {
    if ( this.authService.isLoggedIn()) {
      return true;
    } else {
      this.router.navigate(['/login']).catch();
      return false;
    }
  }

}
