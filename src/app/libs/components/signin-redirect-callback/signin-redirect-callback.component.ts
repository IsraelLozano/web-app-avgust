import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';
import { OauthService } from 'src/app/authentication/services/oauth.service';
import { UsuarioService } from 'src/app/services/usuario.service';
import { InstitucionCarrereSelec } from 'src/app/shared/menu-items/GetDtoUser';
import { SessionService } from '../../services/session.service';
import { LoadingViews } from '../loading/loading.views';

@Component({
  selector: 'app-signin-redirect-callback',
  template: `<div></div>`,
})
export class SigninRedirectCallbackComponent implements OnInit {
  constructor(
    private dialog: MatDialog,
    private _authService: OauthService,
    private _router: Router,
    private usuarioService: UsuarioService,
    private _sessionService: SessionService,
  ) {}
  ngOnInit(): void {
    // const loading = this.dialog.open(LoadingViews, { disableClose: true });
  }
}
