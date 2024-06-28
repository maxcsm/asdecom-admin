import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthenticationService } from './authentication.service';
@Injectable()

export class AuthGuard implements CanActivate {

    constructor(public authenticationService: AuthenticationService, private router: Router) { }

    canActivate(): boolean {
        if (!this.authenticationService.isAuthenticated()) {
          this.router.navigate(['/login']);
          return false;
        }
        return true;
      }


      

}