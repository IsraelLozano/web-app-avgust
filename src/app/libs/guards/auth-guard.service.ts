import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OauthService } from 'src/app/authentication/services/oauth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(private _authService: OauthService, private _router: Router) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // const roles = route.data['roles'] as Array<string>;
    // if(!roles) {
    return this.checkIsUserAuthenticated();
    // }
    // else {
    // return this.checkForAdministrator();
    // }
  }

  private checkIsUserAuthenticated() {
    return this._authService.isAuthenticated().then((res) => {
      return res ? true : this.redirectToUnauthorized();
    });
  }
  // private checkForAdministrator() {
  //   return this._authService.checkIfUserIsAdmin()
  //     .then(res => {
  //       return res ? true : this.redirectToUnauthorized();
  //     });
  // }
  private redirectToUnauthorized() {
    this._router.navigate(['/unauthorized']);
    return false;
  }
}
