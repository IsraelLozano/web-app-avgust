import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  UntypedFormControl,
  FormControl,
  FormGroup,
} from '@angular/forms';
import { CustomValidators } from 'ngx-custom-validators';
import { UsuarioService } from 'src/app/services/usuario.service';
import { MatDialog } from '@angular/material/dialog';
import { finalize } from 'rxjs';
import { LoadingViews } from 'src/app/libs/components/loading/loading.views';
import { DialogService } from 'src/app/shared/dialog/dialog.service';
import { EnumTIPO_DOCUMENTO } from 'src/app/libs/enumerados/EnumMaestras.enum';

// const password = new UntypedFormControl('', Validators.required);
// const confirmPassword = new UntypedFormControl('', CustomValidators.equalTo(password));

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  idSelect!: number;
  // listTipoDoc: enumerado[] = [];

  public form: UntypedFormGroup = Object.create(null);

  constructor(
    private fb: UntypedFormBuilder,
    private router: Router,
    private _usuarioService: UsuarioService,
    private dialog: MatDialog,
    private _dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    // this.GetTipoDocumento();
    this.form = this.fb.group(
      {
        tipoDoc: [null, Validators.compose([Validators.required, CustomValidators.min(1)])],
        email: [null, Validators.compose([Validators.required, CustomValidators.email])],
        // tslint:disable-next-line - Disables all
        password: [null, Validators.compose([Validators.required, Validators.pattern('^[0-9]*$')])],
        // tslint:disable-next-line - Disables all
        // confirmPassword: confirmPassword,
      },
      // {
      //   validators: this.validarLongitud('password'),
      // }
    );
  }

  // validarLongitud(p1: string): any {
  //   return (formGroup: FormGroup) => {
  //     const pass1Control = formGroup.get(p1);

  //     if (pass1Control?.value) {
  //       pass2Control?.setErrors(null);
  //     } else {
  //       pass2Control?.setErrors({ noEsIgual: true });
  //     }
  //   };
  // }
  // GetTipoDocumento() {
  //   const loading = this.dialog.open(LoadingViews, { disableClose: true });
  //   this._usuarioService
  //     .GetTipoDocValidate()
  //     .pipe(finalize(() => loading.close()))
  //     .subscribe((result) => (this.listTipoDoc = result));
  // }

  onSubmit() {
    this.personaValidacion();
  }

  async personaValidacion() {
    const { email, password, tipoDoc } = this.form.value;
    const loading = this.dialog.open(LoadingViews, { disableClose: true });

    // await this._usuarioService
    //   .GetPersonaInstitucionValidate(tipoDoc, password, email)
    //   .then((resp: any) => {
    //     console.log('resultado validaciones', resp);
    //     this.personaValidate = resp;
    //     this.router.navigate(['/authentication/confirm', resp?.ID_PERSONA]);
    //   })
    //   .catch((err) => {
    //     console.log('Error capturado', err);
    //   });
    // loading.close();
  }

  changeLenghtNroDocumento(value: any) {
    const validate = this.form.get('password') as FormControl;

    if (EnumTIPO_DOCUMENTO.DNI == value) {
      validate.setValidators([
        Validators.required,
        Validators.maxLength(8),
        Validators.pattern('^[0-9]*$'),
      ]);
    } else {
      validate.setValidators([
        Validators.required,
        Validators.maxLength(9),
        Validators.pattern('^[0-9]*$'),
      ]);
    }
    validate.updateValueAndValidity();
  }

  get nameField() {
    return this.form.get('password') as FormControl;
  }

  get nameErrors() {
    if (this.nameField.hasError('password')) {
      return 'Este campo es requerido';
    }
    return '';
  }

  get nameFieldNroDoc() {
    return this.form.get('password');
  }
}
