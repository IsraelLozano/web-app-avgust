import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { OauthService } from 'src/app/authentication/services/oauth.service';

@Component({
  selector: 'app-signout-redirect-callback',
  template: `<div></div>`,
})
export class SignoutRedirectCallbackComponent implements OnInit {
  constructor(private _authService: OauthService, private _router: Router) {}

  ngOnInit(): void {
    this._authService.finishLogout().then((_) => {
      this._router.navigate(['/'], { replaceUrl: true });
    });
  }
}
