import { Component, OnInit } from '@angular/core';
import { OauthService } from '../services/oauth.service';

@Component({
  selector: 'app-unauthorized',
  templateUrl: './unauthorized.views.html',
  styles: [],
})
export class UnauthorizedViews implements OnInit {
  public isUserAuthenticated: boolean = false;

  constructor(private _authService: OauthService) {
    this._authService.loginChanged.subscribe((res) => {
      this.isUserAuthenticated = res;
    });
  }

  ngOnInit(): void {
    this._authService.isAuthenticated().then((isAuth) => {
      this.isUserAuthenticated = isAuth;
    });
  }

  public login = () => {
    this._authService.login();
  };
  public logout = () => {
    this._authService.logout();
  };
}
