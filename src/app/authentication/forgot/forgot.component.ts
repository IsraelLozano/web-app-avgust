import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormControl } from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { MatDialog } from '@angular/material/dialog';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { UsuarioService } from 'src/app/services/usuario.service';

@Component({
  selector: 'app-forgot',
  templateUrl: './forgot.component.html',
  styleUrls: ['./forgot.component.scss'],
})
export class ForgotComponent implements OnInit {
  public form: UntypedFormGroup = Object.create(null);
  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private dialog: MatDialog,
    private _usuarioService: UsuarioService,
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      codigo: ['', Validators.required],
      email: [null, Validators.compose([Validators.required, CustomValidators.email])],
    });
  }

  onSubmit(): void {
    this.forgotPassword();
    // this.router.navigate(['/authentication/login']);
  }
  async forgotPassword() {
    const { email, codigo } = this.form.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    await this._usuarioService
      .GetForgotPassword(email, codigo)
      .then((resp) => {
        this.router.navigate(['/authentication/confirm', resp?.IdUsuario]);
      })
      .catch((err) => {
        console.log('Error capturado', err);
      });
    loading.close();
  }
}
