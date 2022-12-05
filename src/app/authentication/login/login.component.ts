import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { OauthService } from '../services/oauth.service';
import { IPaisDto } from 'src/app/models/Maestras/IMaestraDto';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { DialogService } from 'src/app/shared/dialog/dialog.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  public isUserAuthenticated: boolean = false;

  listPais!: IPaisDto[];

  public form: UntypedFormGroup = Object.create(null);
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _authService: OauthService,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
  ) {
    this.getPaises();
  }
  getPaises() {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    this._usuarioService
      .GetListPaises()
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          this.listPais = resp;
        },
        (err) => {
          console.log(err);
        },
      );
  }

  ngOnInit(): void {
    this.form = this.fb.group({
      uname: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      pais: [null, Validators.compose([Validators.required, Validators.minLength(1)])],
    });

    // this._authService.loginChanged.subscribe((res) => {
    //   this.isUserAuthenticated = res;
    // });

    // if (!this.isUserAuthenticated) {
    //   this._authService.login();
    // }
  }

  onSubmit(): void {
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    const { uname, password, pais } = this.form.value;
    this._usuarioService
      .GetLoginOAUth(uname, password, pais)
      .pipe(finalize(() => loading.close()))
      .subscribe(
        (resp) => {
          if (resp.IdUsuario > 0) {
            this.router.navigate(['/home/portalacademico']);
          }
        },
        (err) => {
          console.log(err);
        },
      );
  }
}
