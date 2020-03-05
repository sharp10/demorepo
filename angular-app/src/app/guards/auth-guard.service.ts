import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';

@Injectable()
export class AuthGuardService implements CanActivate {
    constructor(
        private router: Router
    ) { }
    canActivate() {
      var local_token = localStorage.getItem("userToken");
        if (local_token && local_token!='undefined') {
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}