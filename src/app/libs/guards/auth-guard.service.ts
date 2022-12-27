import { SessionService } from 'src/app/libs/services/session.service';
import { Injectable } from '@angular/core';
import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { OauthService } from 'src/app/authentication/services/oauth.service';

@Injectable({
  providedIn: 'root',
})
export class AuthGuardService implements CanActivate {
  constructor(
    private _authService: OauthService,
    private _router: Router,
    private _sesion: SessionService,
  ) {}

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
    // console.log(,this._sesion.user);
    return this._sesion.user.IdUsuario != 0 ? true : this.redirectToUnauthorized();
    // return this._authService.isAuthenticated().then((res) => {
    //   return res ? true : this.redirectToUnauthorized();
    // });
  }
  // private checkForAdministrator() {
  //   return this._authService.checkIfUserIsAdmin()
  //     .then(res => {
  //       return res ? true : this.redirectToUnauthorized();
  //     });
  // }
  private redirectToUnauthorized() {
    this._router.navigateByUrl('/authentication/login');
    return false;
  }
}
